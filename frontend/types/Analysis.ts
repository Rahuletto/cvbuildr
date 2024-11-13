interface StrengthConfidence {
    strength: string;
    confidence: number;
}

interface OverallEvaluation {
    strength: "strong" | "moderate" | "weak";
    confidence: number;
}

export interface AnalysisResult {
    summary: StrengthConfidence;
    skills: StrengthConfidence;
    experience: StrengthConfidence;
    projects: StrengthConfidence;
    overall: OverallEvaluation;
}