import { userApi } from '@/api/UserApi';
import { useAuthentication } from '@/components/AuthenticationProvider';
import { SignInModal } from '@/components/SignInModal';
import { SignUpModal } from '@/components/SignUpModal';
import { UserDto } from '@/models/dto/UserDto';
import {
	EuiAvatar,
	EuiCollapsibleNav,
	EuiCollapsibleNavGroup,
	EuiFlexItem,
	EuiHeader,
	EuiHeaderLink,
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
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignInButton = (): React.ReactElement => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	return (
		<>
			<EuiHeaderLink
				color="primary"
				onClick={(): void => setIsModalVisible(true)}
			>
				Sign in{/* LOC */}
			</EuiHeaderLink>

			{isModalVisible && (
				<SignInModal
					onCancel={(): void => setIsModalVisible(false)}
					onSignIn={(user): void => {
						window.location.reload();
					}}
				/>
			)}
		</>
	);
};

const SignUpButton = (): React.ReactElement => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	return (
		<>
			<EuiHeaderLink
				color="primary"
				onClick={(): void => setIsModalVisible(true)}
			>
				Sign up{/* LOC */}
			</EuiHeaderLink>

			{isModalVisible && (
				<SignUpModal
					onCancel={(): void => setIsModalVisible(false)}
					onSignUp={(): void => setIsModalVisible(false)}
				/>
			)}
		</>
	);
};

interface HeaderUserMenuProps {
	user: UserDto;
}

const HeaderUserMenu = React.memo(
	({ user }: HeaderUserMenuProps): React.ReactElement => {
		const [navIsOpen, setNavIsOpen] = React.useState(false);

		const collapsibleNavId = useGeneratedHtmlId({
			prefix: 'collapsibleNav',
		});

		const listItems: EuiListGroupItemProps[] = React.useMemo(
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
	},
);

export const Header = (): React.ReactElement => {
	const [navIsOpen, setNavIsOpen] = React.useState(false);

	const collapsibleNavId = useGeneratedHtmlId({ prefix: 'collapsibleNav' });

	const navigate = useNavigate();

	const authentication = useAuthentication();

	const listItems: EuiListGroupItemProps[] = React.useMemo(
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
				{!authentication.isLoading &&
					(authentication.user ? (
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
									<HeaderUserMenu
										user={authentication.user}
									/>
								</EuiHeaderLinks>
							</EuiHeaderSectionItem>
						</>
					) : (
						<>
							<EuiHeaderSectionItem>
								<EuiHeaderLinks
									popoverProps={{ repositionOnScroll: true }}
								>
									<SignInButton />
									<SignUpButton />
								</EuiHeaderLinks>
							</EuiHeaderSectionItem>
						</>
					))}
			</EuiHeaderSection>
		</EuiHeader>
	);
};
