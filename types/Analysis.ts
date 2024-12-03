export interface ATSResult {
    summary: {
        grade: string;
        score: number;
        confidence: number;
    };
    skills: {
        score: number;
    };
    workExperience: {
        score: number;
        completeness: string;
        confidence: number;
    };
    projects: {
        score: number;
        confidence: number;
    };
    overallScore: {
        score: number;
        confidence: number;
    };
    formatting: {
        issues: string[];
        score: number;
    };
    keywordMatching: {
        matchScore: number;
    };
    semanticAnalysis: {
        score: number;
    };
    sectionCompleteness: {
        completenessScore: number;
    };
    suggestions?: Suggestions | string;
}

export interface Suggestions {
    overall: string[];
    skills: string[];
    experience: string[];
    summary: string[];
    projects: string[];
    others: string[];
}