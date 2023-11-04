import { SignInModal } from '@/components/SignInModal';
import { SignUpModal } from '@/components/SignUpModal';
import {
	EuiCollapsibleNav,
	EuiCollapsibleNavGroup,
	EuiFlexItem,
	EuiHeader,
	EuiHeaderLink,
	EuiHeaderLinks,
	EuiHeaderSectionItemButton,
	EuiIcon,
	EuiListGroup,
	EuiListGroupItemProps,
	useGeneratedHtmlId,
} from '@elastic/eui';
import {
	HomeRegular,
	NoteRegular,
	NotebookRegular,
	PersonRegular,
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
					onSignIn={(): void => setIsModalVisible(false)}
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

export const Header = (): React.ReactElement => {
	const [navIsOpen, setNavIsOpen] = React.useState(false);

	const collapsibleNavId = useGeneratedHtmlId({ prefix: 'collapsibleNav' });

	const navigate = useNavigate();

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

	const collapsibleNav = (
		<EuiCollapsibleNav
			id={collapsibleNavId}
			isOpen={navIsOpen}
			button={
				<EuiHeaderSectionItemButton
					onClick={(): void => setNavIsOpen(!navIsOpen)}
				>
					<EuiIcon type="menu" size="m" aria-hidden="true" />
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
	);

	const leftSectionItems: React.ReactNode[] = [collapsibleNav];

	return (
		<EuiHeader
			position="fixed"
			sections={[
				{ items: leftSectionItems, borders: 'right' },
				{
					items: [
						<EuiHeaderLinks
							popoverProps={{ repositionOnScroll: true }}
						>
							<SignInButton />
							<SignUpButton />
						</EuiHeaderLinks>,
					],
				},
			]}
		/>
	);
};
