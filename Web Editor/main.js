const htmlcode = document.getElementById("htmlcode");
const csscode = document.getElementById("csscode");
const javascriptcode = document.getElementById("javascriptcode");
const exe = document.getElementById("exeview");

const codeexe = () => {
    const htmlContent = htmlcode.value;
    const cssContent = csscode.value;
    const javascriptContent = javascriptcode.value;

    exe.contentDocument.body.innerHTML = htmlContent + "<style>" + cssContent + "</style>" + "<script>" + javascriptContent + "</script>";
    exe.contentWindow.eval(javascriptContent);
}