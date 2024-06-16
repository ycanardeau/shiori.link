import { NoteDto } from '@/models/dto/NoteDto';
import {
	EuiButton,
	EuiButtonEmpty,
	EuiFieldNumber,
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
import { ReactElement, useState } from 'react';

interface PurchaseNoteCreateModalProps {
	onCancel: () => void;
	onSave: (note: NoteDto) => void;
}

export const PurchaseNoteCreateModal = ({
	onCancel,
	onSave,
}: PurchaseNoteCreateModalProps): ReactElement => {
	const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('1');
	const [currency, setCurrency] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const canSave = true; /* TODO */

	return (
		<EuiModal onClose={onCancel} initialFocus="[name=price]">
			<EuiModalHeader>
				<EuiModalHeaderTitle>
					Add purchase{/* LOC */}
				</EuiModalHeaderTitle>
			</EuiModalHeader>

			<EuiModalBody>
				<EuiForm id={modalFormId} component="form">
					<EuiFormRow label="Price" /* LOC */>
						<EuiFieldNumber
							name="price"
							value={price}
							onChange={(e): void => setPrice(e.target.value)}
							disabled={isLoading}
							min={0}
							step={1}
						/>
					</EuiFormRow>

					<EuiFormRow label="Quantity" /* LOC */>
						<EuiFieldNumber
							name="quantity"
							value={quantity}
							onChange={(e): void => setQuantity(e.target.value)}
							disabled={isLoading}
							min={1}
						/>
					</EuiFormRow>

					<EuiFormRow label="Currency" /* LOC */>
						<EuiFieldText
							name="currency"
							value={currency}
							onChange={(e): void => setCurrency(e.target.value)}
							disabled={isLoading}
							min={1}
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

						/* TODO: const noteCreateResult = await noteApi.createPurchase({
							url: normalizedUrl,
							title: title,
						});
						if (!noteCreateResult.ok) {
							setIsLoading(false);
							return;
						}

						onSave(noteCreateResult.val); */
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
