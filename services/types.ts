export interface TextResponse {
	summary: string;
	result: string;
	textFile: string;
}

export interface BrfResponse {
	summary: string;
	unicodeArray: string;
	brfFile: string;
}

export interface UnicodeRequest {
	unicodeArray: string[];
}
