import apiClient from "./apiClient";

/**
 * Delete a template
 * @param {string} aAUid - The active account Id.
 * @param {string} templateId - The id of the template that user wants to delete
 * @returns {Promise<void>} - Returns nothing
 */
const stringToBrf = (text: string) => {
	// const params = new URLSearchParams();
	// params.append("aAUid", text);

	const data = {
		text,
	};

	return apiClient.post<string>(`/translate/to-brf/text`, data);
};

export default {stringToBrf};
