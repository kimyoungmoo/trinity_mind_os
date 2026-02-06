# Evidence Bundle Specification v1.0.0

## Overview
An Evidence Bundle is the **immutable, verifiable record** of a recipe execution. It proves "what happened" and enables deterministic replay.

## Directory Structure
```
evidence_bundle/
├── META/
│   ├── manifest.json         # Bundle metadata
│   └── signature.sha256      # Cryptographic signature
├── STEPS/
│   ├── step_01_install/      # Per-step evidence
│   │   ├── stdout.log
│   │   ├── stderr.log
│   │   ├── metrics.json
│   │   └── artifacts/
│   └── ...
├── REPORTS/
│   ├── test_report.json
│   ├── security_report.json
│   └── quality_report.json
├── TRACE/
│   ├── execution_trace.jsonl # OpenTelemetry/OTLP format
│   └── causality_graph.json  # Cause-effect relationships
├── METRICS/
│   ├── prometheus_metrics.txt
│   └── custom_metrics.json
└── HASHES/
    ├── inputs.sha256         # Hash of all inputs
    └── outputs.sha256        # Hash of all generated artifacts
```

## File Specifications

### 1. `META/manifest.json`
```json
{
  "bundle_id": "evidence_01HXYZ...",
  "recipe_id": "nextjs-page-build",
  "recipe_version": "1.0.0",
  "execution_id": "exec_12345",
  "runner_version": "1.0.0",
  "start_time": "2026-02-06T10:30:00Z",
  "end_time": "2026-02-06T10:35:00Z",
  "exit_code": 0,
  "evidence_format_version": "1.0.0",
  "provenance": {
    "machine_id": "runner-node-1",
    "tool_versions": {
      "node": "20.11.0",
      "npm": "10.2.4"
    }
  }
}
```

### 2. Step Evidence (`STEPS/step_*/`)
Each step directory contains:
- `stdout.log`: Standard output (UTF-8)
- `stderr.log`: Standard error (UTF-8)
- `metrics.json`: Step-specific metrics
- `artifacts/`: Generated files (optional)

### 3. `TRACE/execution_trace.jsonl`
OpenTelemetry-compatible line-delimited JSON:
```json
{"timestamp":"2026-02-06T10:30:01Z","spanId":"span1","parentSpanId":null,"name":"install","attributes":{"tool":"npm"}}
{"timestamp":"2026-02-06T10:30:02Z","spanId":"span1.1","parentSpanId":"span1","name":"download","attributes":{"package":"react"}}
```

### 4. Hash Files
- `inputs.sha256`: SHA256 of all input files + environment variables
- `outputs.sha256`: SHA256 of all generated artifacts

## Validation Rules (SR₀ Proof Gate)

### Mandatory Evidence (MVP)
- ✅ `manifest.json` exists and valid
- ✅ All required evidence types from recipe present
- ✅ `exit_code: 0` in manifest
- ✅ `HASHES/inputs.sha256` matches recipe input spec
- ✅ No policy violations detected

### Quality Evidence (Recommended)
- ⭐ `TRACE/` directory exists with >1 trace event
- ⭐ `REPORTS/quality_report.json` with QS >= 0.7
- ⭐ Step metrics show resource usage within limits

## Retention Policy
| Evidence Type | Default Retention | Compression |
|---------------|-------------------|-------------|
| Logs (stdout/stderr) | 90 days | gzip |
| Metrics | 365 days | none |
| Artifacts | 30 days | zip |
| Trace events | 180 days | gzip |

## API Endpoints (NeoRunner → SR₀)
```text
POST /evidence/upload
{
  "bundle_id": "evidence_...",
  "recipe_id": "...",
  "compressed_bundle": "base64..."
}

GET /evidence/{bundle_id}/verify
→ Returns { "valid": boolean, "violations": [...] }
```
