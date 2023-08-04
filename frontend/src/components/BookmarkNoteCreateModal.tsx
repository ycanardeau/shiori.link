import { noteApi } from '@/api/NoteApi';
import { urlApi } from '@/api/UrlApi';
import { NoteDto } from '@/models/responses/NoteDto';
import {
	EuiButton,
	EuiButtonEmpty,
	EuiButtonIcon,
	EuiFieldText,
	EuiForm,
	EuiFormRow,
	EuiModal,
	EuiModalBody,
	EuiModalFooter,
	EuiModalHeader,
	EuiModalHeaderTitle,
	useGeneratedHtmlId,
} from '@elastic/eui';
import { OpenRegular } from '@fluentui/react-icons';
import React from 'react';

const normalizedHosts: Record<string, string> = {
	'music.youtube.com': 'youtube.com',
};

function normalizeUrl(url: URL): URL {
	const newUrl = new URL(url.href);

	if (newUrl.protocol === 'http:') {
		newUrl.protocol = 'https:';
	}

	const parts = url.hostname.split('.');
	if (parts[0] === 'www') {
		newUrl.hostname = parts.slice(1).join('.');
	}

	return newUrl;
}

function replaceHostname(url: URL): URL {
	const newUrl = new URL(url.href);

	const normalizedHost = normalizedHosts[url.hostname];
	if (normalizedHost !== undefined) {
		newUrl.hostname = normalizedHost;
	}

	return newUrl;
}

interface BookmarkNoteCreateModalProps {
	onCancel: () => void;
	onSave: (note: NoteDto) => void;
}

export const BookmarkNoteCreateModal = ({
	onCancel,
	onSave,
}: BookmarkNoteCreateModalProps): React.ReactElement => {
	const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

	const [url, setUrl] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const trimmedUrl = url.trim();
	const canSave = trimmedUrl.length > 0;

	return (
		<EuiModal onClose={onCancel} initialFocus="[name=url]">
			<EuiModalHeader>
				<EuiModalHeaderTitle>
					Add bookmark{/* LOC */}
				</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm id={modalFormId} component="form">
					<EuiFormRow label="URL" /* LOC */>
						<EuiFieldText
							name="url"
							value={url}
							onChange={(e): void => setUrl(e.target.value)}
							disabled={isLoading}
							append={
								<EuiButtonIcon
									iconType={OpenRegular}
									href={trimmedUrl}
									target="_blank"
									isDisabled={trimmedUrl.length === 0}
									tabIndex={-1}
								/>
							}
						/>
					</EuiFormRow>
				</EuiForm>
			</EuiModalBody>

			<EuiModalFooter>
				<EuiButtonEmpty onClick={onCancel}>
					Cancel{/* LOC */}
				</EuiButtonEmpty>

				<EuiButton
					type="submit"
					onClick={async (): Promise<void> => {
						setIsLoading(true);

						const replacedUrl = replaceHostname(
							normalizeUrl(new URL(url)),
						).href;
						const urlFetchResult = await urlApi.fetch({
							url: replacedUrl,
						});
						if (!urlFetchResult.ok) {
							setIsLoading(false);
							return;
						}

						const { title, canonical } = urlFetchResult.val;
						const normalizedUrl = normalizeUrl(
							new URL(canonical || replacedUrl),
						).href;

						const noteCreateResult = await noteApi.createBookmark({
							url: normalizedUrl,
							title: title,
						});
						if (!noteCreateResult.ok) {
							setIsLoading(false);
							return;
						}

						onSave(noteCreateResult.val);
					}}
					fill
					disabled={!canSave}
					isLoading={isLoading}
				>
					Save{/* LOC */}
				</EuiButton>
			</EuiModalFooter>
		</EuiModal>
	);
};
