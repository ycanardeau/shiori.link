import {
	EuiLink,
	EuiMarkdownFormat,
	EuiMarkdownFormatProps,
	getDefaultEuiMarkdownParsingPlugins,
	getDefaultEuiMarkdownProcessingPlugins,
} from '@elastic/eui';

export const parsingPluginList = getDefaultEuiMarkdownParsingPlugins();

export const processingPluginList = getDefaultEuiMarkdownProcessingPlugins();
processingPluginList[1][1].components.a = ({
	children,
	...props
}): React.ReactElement => {
	return (
		<EuiLink {...props} external target="_blank">
			{children}
		</EuiLink>
	);
};

export const NoteMarkdownFormat = (
	props: EuiMarkdownFormatProps,
): React.ReactElement => {
	return (
		<EuiMarkdownFormat
			parsingPluginList={parsingPluginList}
			processingPluginList={processingPluginList}
			{...props}
		/>
	);
};
