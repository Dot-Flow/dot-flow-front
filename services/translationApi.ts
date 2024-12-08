import apiClient from "./apiClient";

/**
 * Translate text string to braille
 * @param {string} text - The text to be brailed
 * @returns {Promise<string>} - Returns braille string
 */
const stringToBrf = (text: string) => {
	const data = {
		text,
	};

	return apiClient.post<string>(`/translate/to-brf/text`, data);
};

export default {stringToBrf};
