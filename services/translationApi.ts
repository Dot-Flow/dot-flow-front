import apiClient from "./apiClient";
import {BrfResponse, TextResponse} from "./types";

/**
 * Translate text string to braille
 * @param {string} text - The text to be brailed
 * @returns {BrfResponse} - Returns summary, unicode, file
 */
const stringToBrf = (text: string) => {
	const data = {
		text,
	};

	return apiClient.post<BrfResponse>(`/translate/to-brf/text`, data);
};

/**
 * Translate image file to brf
 * @param {string} fileUri - The image to be brailled
 * @returns {BrfResponse} -  Returns summary, unicode, file
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

	return apiClient.post<BrfResponse>("translate/to-brf/image", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

/**
 * Translate image file to text
 * @param {string} fileUri - The image to be de-brailled
 * @returns {TextResponse} - Returns summary, translation result, file
 */
const imageToText = (fileUri: string) => {
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

	return apiClient.post<TextResponse>("translate/to-text/image", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export default {stringToBrf, imageToBrf, imageToText};
