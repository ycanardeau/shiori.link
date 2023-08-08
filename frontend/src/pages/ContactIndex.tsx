import { contactApi } from '@/api/ContactApi';
import { ContactCreateModal } from '@/components/ContactCreateModal';
import { ContactDto } from '@/models/dto/ContactDto';
import { PaginatedResponse } from '@/models/responses/PaginatedResponse';
import { PaginationStore } from '@/stores/PaginationStore';
import {
	EuiButton,
	EuiLink,
	EuiPageTemplate,
	EuiSpacer,
	EuiTable,
	EuiTableBody,
	EuiTableHeader,
	EuiTableHeaderCell,
	EuiTablePagination,
	EuiTableRow,
	EuiTableRowCell,
} from '@elastic/eui';
import { AddRegular } from '@fluentui/react-icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ContactCreateButtonProps {
	onSave: (contact: ContactDto) => void;
}

const ContactCreateButton = React.memo(
	({ onSave }: ContactCreateButtonProps): React.ReactElement => {
		const [isModalVisible, setIsModalVisible] = React.useState(false);
		const closeModal = (): void => setIsModalVisible(false);
		const showModal = (): void => setIsModalVisible(true);

		const handleSave = React.useCallback(
			(contact: ContactDto) => {
				closeModal();

				onSave(contact);
			},
			[onSave],
		);

		return (
			<>
				<EuiButton iconType={AddRegular} onClick={showModal}>
					Add contact{/* LOC */}
				</EuiButton>

				{isModalVisible && (
					<ContactCreateModal
						onCancel={closeModal}
						onSave={handleSave}
					/>
				)}
			</>
		);
	},
);

const ContactIndex = observer((): React.ReactElement => {
	const [response, setResponse] =
		React.useState<PaginatedResponse<ContactDto>>();

	const [paginationStore] = React.useState(() => new PaginationStore());

	const handleSaveContact = React.useCallback(
		(contact: ContactDto): void => {},
		[],
	);

	React.useEffect(() => {
		contactApi.list({}).then((result) => {
			if (result.ok) {
				setResponse(result.val);
			}
		});
	}, []);

	const navigate = useNavigate();

	return (
		<EuiPageTemplate>
			<EuiPageTemplate.Header
				pageTitle="Contacts" /* LOC */
				rightSideItems={[
					<ContactCreateButton onSave={handleSaveContact} />,
				]}
				breadcrumbs={[
					{
						text: 'Contacts' /* LOC */,
					},
				]}
			/>

			<EuiPageTemplate.Section>
				{response && (
					<>
						<EuiTable>
							<EuiTableHeader>
								<EuiTableHeaderCell>
									Name{/* LOC */}
								</EuiTableHeaderCell>
							</EuiTableHeader>

							<EuiTableBody>
								{response.items.map((contact) => (
									<EuiTableRow key={contact.id}>
										<EuiTableRowCell>
											<EuiLink
												href={`/contacts/${contact.id}`}
												onClick={(
													e: React.MouseEvent,
												): void => {
													e.preventDefault();
													navigate(
														`/contacts/${contact.id}`,
													);
												}}
											>
												{[
													contact.lastName,
													contact.firstName,
												].join(' ')}
											</EuiLink>
										</EuiTableRowCell>
									</EuiTableRow>
								))}
							</EuiTableBody>
						</EuiTable>

						<EuiSpacer size="m" />

						<EuiTablePagination
							pageCount={Math.ceil(
								response.totalCount / paginationStore.perPage,
							)}
							activePage={paginationStore.page - 1}
							onChangePage={(pageIndex): void =>
								paginationStore.setPage(pageIndex + 1)
							}
							itemsPerPage={paginationStore.perPage}
							onChangeItemsPerPage={(pageSize): void =>
								paginationStore.setPerPage(pageSize)
							}
						/>
					</>
				)}
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
});

export default ContactIndex;
