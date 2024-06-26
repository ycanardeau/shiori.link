// https://github.com/elastic/eui/issues/5463#issuecomment-1107665339
import { ICON_TYPES } from '@elastic/eui';
import { icon as alert } from '@elastic/eui/es/components/icon/assets/alert';
import { icon as apps } from '@elastic/eui/es/components/icon/assets/apps';
import { icon as arrowEnd } from '@elastic/eui/es/components/icon/assets/arrowEnd';
import { icon as arrowStart } from '@elastic/eui/es/components/icon/assets/arrowStart';
import { icon as arrowDown } from '@elastic/eui/es/components/icon/assets/arrow_down';
import { icon as arrowLeft } from '@elastic/eui/es/components/icon/assets/arrow_left';
import { icon as arrowRight } from '@elastic/eui/es/components/icon/assets/arrow_right';
import { icon as calendar } from '@elastic/eui/es/components/icon/assets/calendar';
import { icon as check } from '@elastic/eui/es/components/icon/assets/check';
import { icon as copyClipboard } from '@elastic/eui/es/components/icon/assets/copy_clipboard';
import { icon as cross } from '@elastic/eui/es/components/icon/assets/cross';
import { icon as dot } from '@elastic/eui/es/components/icon/assets/dot';
import { icon as editorBold } from '@elastic/eui/es/components/icon/assets/editor_bold';
import { icon as editorChecklist } from '@elastic/eui/es/components/icon/assets/editor_checklist';
import { icon as editorCodeBlock } from '@elastic/eui/es/components/icon/assets/editor_code_block';
import { icon as editorComment } from '@elastic/eui/es/components/icon/assets/editor_comment';
import { icon as editorItalic } from '@elastic/eui/es/components/icon/assets/editor_italic';
import { icon as editorLink } from '@elastic/eui/es/components/icon/assets/editor_link';
import { icon as editorOrderedList } from '@elastic/eui/es/components/icon/assets/editor_ordered_list';
import { icon as editorUnorderedList } from '@elastic/eui/es/components/icon/assets/editor_unordered_list';
import { icon as empty } from '@elastic/eui/es/components/icon/assets/empty';
import { icon as eye } from '@elastic/eui/es/components/icon/assets/eye';
import { icon as eyeClosed } from '@elastic/eui/es/components/icon/assets/eye_closed';
import { icon as lock } from '@elastic/eui/es/components/icon/assets/lock';
import { icon as logoGithub } from '@elastic/eui/es/components/icon/assets/logo_github';
import { icon as menu } from '@elastic/eui/es/components/icon/assets/menu';
import { icon as popout } from '@elastic/eui/es/components/icon/assets/popout';
import { icon as questionInCircle } from '@elastic/eui/es/components/icon/assets/question_in_circle';
import { icon as quote } from '@elastic/eui/es/components/icon/assets/quote';
import { icon as returnKey } from '@elastic/eui/es/components/icon/assets/return_key';
import { icon as search } from '@elastic/eui/es/components/icon/assets/search';
import { icon as sortDown } from '@elastic/eui/es/components/icon/assets/sort_down';
import { icon as sortUp } from '@elastic/eui/es/components/icon/assets/sort_up';
import { icon as userAvatar } from '@elastic/eui/es/components/icon/assets/userAvatar';
import { icon as warning } from '@elastic/eui/es/components/icon/assets/warning';
import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';
import { ValuesType } from 'utility-types';

type IconComponentNameType = ValuesType<typeof ICON_TYPES>;
type IconComponentCacheType = Partial<Record<IconComponentNameType, unknown>>;

const cachedIcons: IconComponentCacheType = {
	alert,
	apps,
	arrowDown,
	arrowEnd,
	arrowLeft,
	arrowRight,
	arrowStart,
	calendar,
	check,
	copyClipboard,
	cross,
	dot,
	editorBold,
	editorChecklist,
	editorComment,
	editorCodeBlock,
	editorItalic,
	editorLink,
	editorOrderedList,
	editorUnorderedList,
	empty,
	eye,
	eyeClosed,
	lock,
	logoGithub,
	menu,
	popout,
	questionInCircle,
	quote,
	returnKey,
	search,
	sortDown,
	sortUp,
	userAvatar,
	warning,
};

appendIconComponentCache(cachedIcons);
