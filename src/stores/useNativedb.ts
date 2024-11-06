import { defineStore } from 'pinia'
import axios from 'axios'

export const useNativedb = defineStore('nativedb', {
    state: () => ({
        namespacesJson: {} as INatives,
        loading: false,
        expansion: [] as string[],
    }),
    actions: {
        async getNamespaces(url: string) {
            this.loading = true
            return axios.get(url).then(({ data }) => {
                this.namespacesJson = data
                // console.log(this.namespacesJson);
                this.loading = false
            })
        },
        // 生成 natives.h 文件
        async generateNativesFile() {
            let endl = "\r\n"
            let resultString = "";
            let date = new Date();
            resultString += "#pragma once" + endl + endl
                + "// Generated " + date.toUTCString() + endl + endl;
            for (let namespace in this.namespacesJson) {
                resultString += "namespace " + namespace + endl +
                    "{" + endl;
                let nsObj = this.namespacesJson[namespace];
                for (let native in nsObj) {
                    let nativeObj = nsObj[native];
                    resultString += "\tstatic " + nativeObj.return_type + " " + nativeObj.name + "(";
                    let paramsObj = nativeObj["params"];
                    paramsObj.forEach((paramObj, index) => {
                        // let paramObj = paramsObj[param];
                        resultString += paramObj.type + (paramObj.type == "" ? "" : " ") + paramObj.name + (index != paramsObj.length - 1 ? ", " : "");
                    })


                    if (nativeObj.return_type == "void") {
                        resultString += ") { invoke<Void>(";
                    }
                    else {
                        resultString += ") { return invoke<" + nativeObj.return_type + ">(";
                    }

                    resultString += native + (paramsObj.length != 0 ? ", " : "");
                    paramsObj.forEach((paramObj, index) => {
                        resultString += paramObj.name + (index != paramsObj.length - 1 ? ", " : "");
                    })

                    resultString += "); }" + " // " + native + (nativeObj.unused ? " unused" : "") + endl;
                }

                resultString += "}" + endl + endl;
            }
            this.download("natives.h", resultString);
        },
        download(filename: string, text: string) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }

    }
})