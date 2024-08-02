import { createGlobalStyle, keyframes } from "styled-components";

const upframe = keyframes`
	from{
		opacity: 0;
	}
	to{
		opacity: 1;
	}
`

const GlobalStyles = createGlobalStyle` 

	@font-face {
		font-family: 'GyeonggiBatang';
		src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GyeonggiBatang.woff') format('woff');
		font-style: normal;
	}

    @font-face {
		font-family: 'GyeonggiBatang-bold';
		src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GyeonggiBatang.woff') format('woff');
		font-style: normal;
	}

    :root {
        --primary-color: #7a22d6;
		--sfnt: normal normal normal 14px/1.4em helvetica-w01-bold,helvetica-w02-bold,helvetica-lt-w10-bold,sans-serif;
        --fnt: normal normal normal 16px/1.4em helvetica-w01-bold,helvetica-w02-bold,helvetica-lt-w10-bold,sans-serif;
		--middle-fnt: normal normal normal 24px/1.4em helvetica-w01-bold,helvetica-w02-bold,helvetica-lt-w10-bold,sans-serif;
		--main-fnt: normal normal normal 36px/1.4em helvetica-w01-bold,helvetica-w02-bold,helvetica-lt-w10-bold,sans-serif;
		--main-fnt: normal normal bold 36px/1.4em helvetica-w01-bold,helvetica-w02-bold,helvetica-lt-w10-bold,sans-serif;
		::-webkit-scrollbar {
			display: none;
		}
		-ms-overflow-style: none;
    }

	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;

		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;

		-webkit-user-select:none;
		-moz-user-select:none;
		-ms-user-select:none;
		user-select:none;
		/* animation: ${() => upframe} 0.5s linear; */

		background-image: linear-gradient(transparent, transparent);
		transition: all 0.25s ease-in-out;

		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
		scroll-behavior: smooth;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		outline: inherit;
		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
		
	}
`;

export default GlobalStyles;