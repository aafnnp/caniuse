import cliHtml from "cli-html"

export default (args)=>{
    return console.log(cliHtml(`<div class="caniuse-section">
        <h4>Desktop</h4>
        <table class="browser-support-table">
            <thead>
                <tr>
                    <th class="chrome"><span>Chrome</span></th>
                    <th class="firefox"><span>Firefox</span></th>
                    <th class="ie"><span>IE</span></th>
                    <th class="edge"><span>Edge</span></th>
                    <th class="safari"><span>Safari</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="y yep" title="Chrome - "><span class="caniuse-agents-version version">${args.chrome || "not supported"}</span></td>
                    <td class="y yep" title="Firefox - "><span class="caniuse-agents-version version">${args.firefox || "not supported"}</span></td>
                    <td class="a yep-nope yep-nope-partial" title="IE - "><span
                            class="caniuse-agents-version version">${args.ie || "not supported"}</span></td>
                    <td class="y yep" title="Edge - "><span class="caniuse-agents-version version">${args.edge || "not supported"}</span></td>
                    <td class="y yep" title="Safari - "><span class="caniuse-agents-version version">${args.safari || "not supported"}</span></td>
                </tr>
        </table>
    </div>
    <div class="caniuse-section">
        <h4>Mobile / Tablet</h4>
        <table class="browser-support-table">
            <thead>
                <tr>
                    <th class="and_chr"><span>Android Chrome</span></th>
                    <th class="and_ff"><span>Android Firefox</span></th>
                    <th class="android"><span>Android</span></th>
                    <th class="ios_saf"><span>iOS Safari</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="y yep" title="Android Chrome - "><span class="caniuse-agents-version version">${args.and_chr || "not supported"}</span></td>
                    <td class="y yep" title="Android Firefox - "><span class="caniuse-agents-version version">${args.and_ff || "not supported"}</span></td>
                    <td class="y yep" title="Android - "><span class="caniuse-agents-version version">${args.android || "not supported"}</span></td>
                    <td class="y yep" title="iOS Safari - "><span class="caniuse-agents-version version">${args.ios_saf || "not supported"}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`))
}