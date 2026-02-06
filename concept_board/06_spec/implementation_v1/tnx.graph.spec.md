# TNX Nexus Graph Specification v1.0.0

## Core Concepts
TNX transforms recipes into **searchable, rankable, recomposable assets** through a weighted directed graph.

## Graph Model

### Node Types
```typescript
enum NodeType {
  INTENT = "intent",          // High-level goal
  CAPSULE = "capsule",        // 13-phase container
  RECIPE = "recipe",          // SR₀-approved execution spec
  ARTIFACT = "artifact",      // Generated output
  EVIDENCE = "evidence",      // Proof bundle
  POLICY_PACK = "policy_pack",// Rule set
  USER = "user",              // Creator/consumer
  TEAM = "team"               // Owning group
}
```

### Edge Types
```typescript
enum EdgeType {
  EXPRESSED_AS = "expressed_as",    // Intent → Capsule
  FINALIZES_TO = "finalizes_to",    // Capsule → Recipe
  PRODUCES = "produces",            // Recipe → Artifact
  PROVEN_BY = "proven_by",          // Recipe → Evidence
  REUSES = "reuses",                // Recipe → PolicyPack
  DERIVED_FROM = "derived_from",    // Recipe → Recipe (versioning)
  IMPROVES = "improves",            // Recipe → Recipe (better)
  CONFLICTS_WITH = "conflicts_with",// Recipe ↔ Recipe
  USED_BY = "used_by",              // Recipe → User/Team
  RECOMMENDS = "recommends"         // Recipe → Recipe (TNX rec)
}
```

## Node Schema (JSON)

### Recipe Node Example
```json
{
  "node_id": "node_recipe_01H...",
  "type": "recipe",
  "data": {
    "recipe_id": "nextjs-page-build",
    "version": "1.0.0",
    "title": "Next.js Page Build with Performance Budget",
    "description": "Builds and exports static Next.js pages...",
    "quality": {
      "qs": 0.92,
      "repro_rate": 0.98,
      "verifier_level": 2
    },
    "usage": {
      "run_count": 142,
      "unique_users": 23,
      "last_used": "2026-02-06T10:30:00Z"
    },
    "tags": ["frontend", "nextjs", "performance"],
    "created_at": "2026-01-15T14:30:00Z",
    "updated_at": "2026-02-06T10:30:00Z"
  },
  "vector_embedding": [0.12, -0.34, ...] // 384-dim for semantic search
}
```

## Edge Schema
```json
{
  "edge_id": "edge_01...",
  "from_node": "node_recipe_001",
  "to_node": "node_recipe_002",
  "type": "derived_from",
  "weight": 0.95,
  "metadata": {
    "confidence": 0.98,
    "evidence_refs": ["evidence_123", "evidence_456"],
    "created_at": "2026-02-06T10:30:00Z"
  }
}
```

## Weight Calculation Algorithms

### Recipe Quality Score (QS)
```text
QS = 0.4 * test_coverage
   + 0.3 * security_score
   + 0.2 * performance_score
   + 0.1 * documentation_completeness
```

### Edge Weight Formula
```text
weight(edge) = base_weight * decay_factor * confidence

where:
  base_weight = {
    "derived_from": 1.0,
    "improves": 0.8,
    "reuses": 0.6,
    "conflicts_with": -1.0
  }
  decay_factor = e^(-0.0001 * hours_since_creation)
  confidence = evidence_count / max(evidence_count, 10)
```

## Ranking Algorithm (Best-Recipe v0)
```python
def rank_recipes(query_vector, candidate_nodes, context):
    scores = {}
    
    for node in candidate_nodes:
        # Semantic similarity (cosine)
        semantic_score = cosine_similarity(
            query_vector, 
            node.vector_embedding
        )
        
        # Quality component
        quality_score = (
            0.5 * node.data.quality.qs +
            0.3 * node.data.quality.repro_rate +
            0.2 * math.log(node.data.usage.run_count + 1)
        )
        
        # Policy compatibility
        policy_score = calculate_policy_compatibility(
            node.data.policy_refs,
            context.current_policy_pack
        )
        
        # Recency boost
        recency_boost = 1.0 / (1.0 + days_ago(node.data.updated_at))
        
        # Final score
        scores[node.node_id] = (
            0.4 * semantic_score +
            0.4 * quality_score +
            0.2 * policy_score
        ) * recency_boost
    
    return sorted(scores.items(), key=lambda x: x[1], reverse=True)
```

## Graph Query API

### 1. Search Recipes
```text
POST /tnx/v1/search
{
  "query": "nextjs build performance",
  "filters": {
    "tags": ["frontend"],
    "min_qs": 0.7,
    "max_complexity": "medium"
  },
  "limit": 10
}
```

### 2. Get Recommendations
```text
POST /tnx/v1/recommend
{
  "recipe_id": "current_recipe",
  "context": {
    "team_id": "team_abc",
    "project_type": "web_app"
  },
  "strategy": "similar_high_quality"
}
```

### 3. Traverse Graph
```text
GET /tnx/v1/graph/traverse
?node_id=node_recipe_123
&depth=2
&edge_types=derived_from,improves
```

## Storage Backend Requirements
- **Primary**: Neo4j / Amazon Neptune (graph-native)
- **Secondary**: PostgreSQL + pgvector (for embeddings)
- **Cache**: Redis (hot graph segments)

### Index Strategy
- Vector index on `node.vector_embedding` (HNSW)
- Composite index on `(type, tags, quality.qs)`
- Full-text index on title + description
