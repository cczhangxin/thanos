<template>
    <router-view></router-view>
</template>
<style>
    /* http://meyerweb.com/eric/tools/css/reset/
     v2.0 | 20110126
     License: none (public domain)
  */

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
        font-weight: normal;
        text-decoration: none;
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
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    /*浏览器滚动条样式*/
    ::-webkit-scrollbar {
        width: 4px;
    }

    ::-webkit-scrollbar-track-piece {
        background-color: #fff;
        -webkit-border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:vertical {
        background-color: #409eff;
        -webkit-border-radius: 6px;
    }

    .el-scrollbar__wrap {
        overflow: auto !important;
    }

    body {
        font-family: "Microsoft Yahei";
        background: #fff;
        min-width: 1060px;
    }

    #header {
        padding-left: 240px;
    }

    #header .el-submenu__title i {
        color: #ffd04b;
    }

    .el-input__prefix {
        left: 10px;
    }

    .table-pagination {
        float: right;
        margin-top: 20px;
    }

    .header-search {
        margin-bottom: 20px;
        margin-top: 40px;
    }

    .header-add-btn {
        float: right;
    }

    .header-search .el-input, .header-search .el-select {
        margin-right: 20px;
    }
</style>
