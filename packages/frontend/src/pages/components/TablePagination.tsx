import { PaginationStore } from '@/stores/PaginationStore';
import { EuiTablePagination } from '@elastic/eui';
import { observer } from 'mobx-react-lite';
import { ReactElement } from 'react';

interface TablePaginationProps {
	paginationStore: PaginationStore;
}

export const TablePagination = observer(
	({ paginationStore }: TablePaginationProps): ReactElement => {
		return (
			<EuiTablePagination
				pageCount={paginationStore.pageCount}
				activePage={paginationStore.pageIndex}
				onChangePage={paginationStore.setPageIndex}
				itemsPerPage={paginationStore.perPage}
				onChangeItemsPerPage={paginationStore.setPerPage}
			/>
		);
	},
);
