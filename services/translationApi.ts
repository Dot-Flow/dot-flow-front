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

/**
 * Translate image file to brf
 * @param {string} fileUri - The image to be brailled
 * @returns {Promise<string>} - Returns braille string
 */
const imageToBrf = (fileUri: string) => {
	const formData = new FormData();
	// Extract the file name and provide a fallback in case it's undefined
	const filename = fileUri.split("/").pop() || "uploaded_file.jpg";

	// Determine the MIME type based on the file extension
	const type = `image/${filename.split(".").pop() || "jpeg"}`;

	formData.append("multipartFile", {
		uri: fileUri,
		name: filename,
		type: type,
	} as any);

	return apiClient.post<Promise<string>>("translate/to-brf/image", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	// return apiClient.post<string>(`/translate/to-brf/text`, data);
};

export default {stringToBrf};
