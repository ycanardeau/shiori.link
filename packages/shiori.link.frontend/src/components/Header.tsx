import { userApi } from '@/api/UserApi';
import { useAuthentication } from '@/components/AuthenticationProvider';
import { UserDto } from '@/models/dto/UserDto';
import {
	EuiAvatar,
	EuiCollapsibleNav,
	EuiCollapsibleNavGroup,
	EuiFlexItem,
	EuiHeader,
	EuiHeaderLinks,
	EuiHeaderSection,
	EuiHeaderSectionItem,
	EuiHeaderSectionItemButton,
	EuiIcon,
	EuiListGroup,
	EuiListGroupItemProps,
	useGeneratedHtmlId,
} from '@elastic/eui';
import {
	AddRegular,
	HomeRegular,
	NoteRegular,
	NotebookRegular,
	PersonRegular,
	SignOutRegular,
} from '@fluentui/react-icons';
import { ReactElement, memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderUserMenuProps {
	user: UserDto;
}

const HeaderUserMenu = memo(({ user }: HeaderUserMenuProps): ReactElement => {
	const [navIsOpen, setNavIsOpen] = useState(false);

	const collapsibleNavId = useGeneratedHtmlId({
		prefix: 'collapsibleNav',
	});

	const listItems: EuiListGroupItemProps[] = useMemo(
		() => [
			{
				label: 'Sign out' /* LOC */,
				iconType: SignOutRegular,
				href: '/',
				onClick: async (e): Promise<void> => {
					e.preventDefault();

					setNavIsOpen(false);

					const logoutResult = await userApi.logout({});

					if (logoutResult.ok) {
						window.location.reload();
					}
				},
			},
		],
		[],
	);

	return (
		<EuiCollapsibleNav
			id={collapsibleNavId}
			isOpen={navIsOpen}
			button={
				<EuiHeaderSectionItemButton
					onClick={(): void => setNavIsOpen(!navIsOpen)}
				>
					<EuiAvatar
						name={user.username}
						size="s"
						imageUrl={user.avatarUrl}
					/>
				</EuiHeaderSectionItemButton>
			}
			onClose={(): void => setNavIsOpen(false)}
			side="right"
		>
			<EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
				<EuiCollapsibleNavGroup
					background="light"
					style={{ maxHeight: '40vh' }}
					className="eui-yScroll"
				>
					<EuiListGroup
						listItems={listItems}
						maxWidth="none"
						color="text"
						gutterSize="none"
						size="s"
					/>
				</EuiCollapsibleNavGroup>
			</EuiFlexItem>
		</EuiCollapsibleNav>
	);
});

export const Header = (): ReactElement => {
	const [navIsOpen, setNavIsOpen] = useState(false);

	const collapsibleNavId = useGeneratedHtmlId({ prefix: 'collapsibleNav' });

	const navigate = useNavigate();

	const authentication = useAuthentication();

	const listItems: EuiListGroupItemProps[] = useMemo(
		() => [
			{
				label: 'Home' /* LOC */,
				iconType: HomeRegular,
				href: '/',
				onClick: (e): void => {
					e.preventDefault();

					setNavIsOpen(false);

					navigate('/');
				},
			},
			{
				label: 'Notes' /* LOC */,
				iconType: NoteRegular,
				href: 'notes',
				onClick: (e): void => {
					e.preventDefault();

					setNavIsOpen(false);

					navigate('/notes');
				},
			},
			{
				label: 'Contacts' /* LOC */,
				iconType: PersonRegular,
				href: 'contacts',
				onClick: (e): void => {
					e.preventDefault();

					setNavIsOpen(false);

					navigate('/contacts');
				},
			},
			{
				label: 'Notebooks' /* LOC */,
				iconType: NotebookRegular,
				href: 'notebooks',
				onClick: (e): void => {
					e.preventDefault();

					setNavIsOpen(false);

					navigate('/notebooks');
				},
			},
		],
		[navigate],
	);

	return (
		<EuiHeader position="fixed">
			<EuiHeaderSection>
				<EuiHeaderSectionItem>
					<EuiCollapsibleNav
						id={collapsibleNavId}
						isOpen={navIsOpen}
						button={
							<EuiHeaderSectionItemButton
								onClick={(): void => setNavIsOpen(!navIsOpen)}
							>
								<EuiIcon
									type="menu"
									size="m"
									aria-hidden="true"
								/>
							</EuiHeaderSectionItemButton>
						}
						onClose={(): void => setNavIsOpen(false)}
					>
						<EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
							<EuiCollapsibleNavGroup
								background="light"
								style={{ maxHeight: '40vh' }}
								className="eui-yScroll"
							>
								<EuiListGroup
									listItems={listItems}
									maxWidth="none"
									color="text"
									gutterSize="none"
									size="s"
								/>
							</EuiCollapsibleNavGroup>
						</EuiFlexItem>
					</EuiCollapsibleNav>
				</EuiHeaderSectionItem>
			</EuiHeaderSection>

			<EuiHeaderSection side="right">
				{authentication.user && (
					<>
						<EuiHeaderSectionItem>
							<EuiHeaderSectionItemButton>
								<EuiIcon type={AddRegular} />
							</EuiHeaderSectionItemButton>
						</EuiHeaderSectionItem>

						<EuiHeaderSectionItem>
							<EuiHeaderLinks
								popoverProps={{ repositionOnScroll: true }}
							>
								<HeaderUserMenu user={authentication.user} />
							</EuiHeaderLinks>
						</EuiHeaderSectionItem>
					</>
				)}
			</EuiHeaderSection>
		</EuiHeader>
	);
};
