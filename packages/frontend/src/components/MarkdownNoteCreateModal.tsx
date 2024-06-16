import { noteApi } from '@/api/NoteApi';
import {
	parsingPluginList,
	processingPluginList,
} from '@/components/NoteMarkdownFormat';
import { NoteDto } from '@/models/dto/NoteDto';
import {
	EuiButton,
	EuiButtonEmpty,
	EuiForm,
	EuiFormRow,
	EuiModal,
	EuiModalBody,
	EuiModalFooter,
	EuiModalHeader,
	EuiModalHeaderTitle,
	EuiTextArea,
	useGeneratedHtmlId,
} from '@elastic/eui';
import { ReactElement, useState } from 'react';
import rehypeStringify from 'rehype-stringify';
import unified from 'unified';
import { VFileContents } from 'vfile';

const processor = unified()
	.use(parsingPluginList)
	.use([processingPluginList[0], rehypeStringify]);

function extractUrlsFromMarkdown(text: string): string[] {
	const processed = processor.processSync(text);
	const result = (processed.result as VFileContents) ?? processed.contents;
	const html =
		typeof result === 'string' ? result : new TextDecoder().decode(result);

	const parser = new DOMParser();
	const document = parser.parseFromString(html, 'text/html');
	const anchors = document.getElementsByTagName('a');
	const urls = Array.from(anchors).map((anchor) => anchor.href);
	return urls;
}

interface MarkdownNoteCreateModalProps {
	onCancel: () => void;
	onSave: (note: NoteDto) => void;
}

export const MarkdownNoteCreateModal = ({
	onCancel,
	onSave,
}: MarkdownNoteCreateModalProps): ReactElement => {
	const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

	const [text, setText] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const trimmedText = text.trim();
	const canSave = trimmedText.length > 0;

	return (
		<EuiModal
			style={{ width: 600 }}
			onClose={onCancel}
			initialFocus="[name=text]"
		>
			<EuiModalHeader>
				<EuiModalHeaderTitle>
					Add markdown{/* LOC */}
				</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm id={modalFormId} component="form">
					<EuiFormRow label="Text" /* LOC */ fullWidth>
						<EuiTextArea
							name="text"
							fullWidth
							value={text}
							onChange={(e): void => setText(e.target.value)}
							disabled={isLoading}
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

						const urls = extractUrlsFromMarkdown(trimmedText);
						const result = await noteApi.createMarkdown({
							text: trimmedText,
							urls: urls,
						});
						if (!result.ok) {
							setIsLoading(false);
							return;
						}

						onSave(result.val);
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
