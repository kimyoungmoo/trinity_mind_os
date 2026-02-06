

import { GoogleGenAI, Type } from "@google/genai";
import { CubeGeneratedItem, AiGenConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const NATURE_PROMPTS = {
  CE: "창의적이고 확산적인 탐색 단계(CE)입니다. 고정관념을 벗어난 새로운 관점과 아이디어를 많이 제안해주세요.",
  AQ: "결단과 실행 단계(AQ)입니다. 실제로 무엇을 해야 하는지, 어떤 결정을 내려야 하는지 구체적인 실행 방안 중심으로 제안해주세요.",
  GF: "구조화와 시스템 단계(GF)입니다. 정보를 체계적으로 분류하고 논리적인 흐름을 가질 수 있도록 구조적인 관점에서 제안해주세요.",
  SR0: "응축과 공명 단계(SR0)입니다. 모든 정보를 하나의 본질적인 문장이나 원리(Singularity)로 추출하세요."
};

const COLOR_GUIDE = `
색상 선정 가이드:
- blue: 신뢰, 분석, 실행, 차분함
- purple: 통찰, 신비, 비전, 예술적
- emerald: 성장, 생명력, 새로운 시작, 긍정
- amber: 구조, 논리, 경고, 안정성
- rose: 열정, 긴급, 감성, 핵심
- indigo: 지혜, 깊은 사고, 철학
`;

export const resonateEssence = async (
  title: string,
  content: string,
  subContexts: string[]
): Promise<string> => {
  try {
    const prompt = `
      [SR0: 응축 모드]
      당신은 수많은 정보에서 하나의 본질을 추출하는 '사고의 여과기'입니다.
      
      메인 주제: "${title}"
      현재 내용: "${content}"
      하위 맥락들:
      ${subContexts.map((c, i) => `${i + 1}. ${c}`).join('\n')}
      
      [요구사항]
      이 모든 내용을 관통하는 단 하나의 '핵심 본질(Essence)'을 한 문장으로 추출하세요. 
      결과는 한국어로 한 문장만 출력하세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
    });

    return response.text?.trim() || "본질을 추출하지 못했습니다.";
  } catch (error) {
    console.error("Resonance error:", error);
    throw error;
  }
};

export const generateSubCubes = async (
  topic: string,
  context: string = "",
  config: AiGenConfig = { count: 4, nature: 'CE' }
): Promise<CubeGeneratedItem[]> => {
  try {
    const prompt = `
      당신은 창의적인 사고 보조 에이전트입니다.
      사용자 토픽: "${topic}"
      현재 맥락/노트: "${context}"
      
      [사고 지침]
      - 성격: ${NATURE_PROMPTS[config.nature]}
      - 개수: 정확히 ${config.count}개의 하위 항목을 생성하세요.
      ${config.customInstruction ? `- 추가 요청사항: ${config.customInstruction}` : ""}
      
      [색상 할당]
      ${COLOR_GUIDE}
      
      각 항목은 제목(title), 한 문장의 핵심 설명(description), 그리고 내용의 성격에 맞는 suggestedColor를 포함해야 합니다.
      모든 내용은 한국어로 작성하세요.
      결과는 반드시 JSON 배열 형식으로 반환하세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "하위 토픽의 제목" },
              description: { type: Type.STRING, description: "하위 토픽에 대한 짧은 설명" },
              suggestedColor: {
                type: Type.STRING,
                enum: ['blue', 'purple', 'emerald', 'amber', 'rose', 'indigo'],
                description: "내용의 성격에 어울리는 색상"
              },
            },
            required: ["title", "description", "suggestedColor"],
          },
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text) as CubeGeneratedItem[];
      return data.slice(0, config.count);
    }

    return [];
  } catch (error) {
    console.error("Error generating sub-cubes:", error);
    throw error;
  }
};

/**
 * Gemini 2.5 Flash Image (Nano Banana)를 사용하여 이미지를 생성합니다.
 */
export const generateLandingImage = async (prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" = "1:1"): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};

export const elaborateNote = async (
  topic: string,
  currentContent: string
): Promise<string> => {
  try {
    const prompt = `
          당신은 전문적인 노트 정리 전문가입니다.
          주제: "${topic}"
          현재 내용: "${currentContent}"
          위 내용을 바탕으로 정보를 확장하고 정리하세요. 마크다운 형식을 사용하세요. 한국어로 답변하세요.
        `;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || currentContent;
  } catch (error) {
    console.error("Error elaborating note:", error);
    throw error;
  }
}
