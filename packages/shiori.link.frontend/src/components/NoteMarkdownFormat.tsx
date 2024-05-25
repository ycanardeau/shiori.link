import {
	EuiLink,
	EuiMarkdownFormat,
	EuiMarkdownFormatProps,
	getDefaultEuiMarkdownParsingPlugins,
	getDefaultEuiMarkdownProcessingPlugins,
} from '@elastic/eui';
import { ReactElement } from 'react';

export const parsingPluginList = getDefaultEuiMarkdownParsingPlugins();

export const processingPluginList = getDefaultEuiMarkdownProcessingPlugins();
processingPluginList[1][1].components.a = ({
	children,
	...props
}): ReactElement => {
	return (
		<EuiLink {...props} external target="_blank">
			{children}
		</EuiLink>
	);
};

export const NoteMarkdownFormat = (
	props: EuiMarkdownFormatProps,
): ReactElement => {
	return (
		<EuiMarkdownFormat
			parsingPluginList={parsingPluginList}
			processingPluginList={processingPluginList}
			{...props}
		/>
	);
};
