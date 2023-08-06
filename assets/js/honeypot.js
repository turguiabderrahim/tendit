api_url="https://api.honeypot.is/v1/",API_URL="https://api.honeypot.is",props={passed:{bg:"bg-secondaryLight",fc:"text-lightGreen",sum_heading:"Does not seem like a honeypot",sum_subheading:"This can always change! Do your own due diligence.",title:"PASSED",title_bg:"bg-passedGreen",title_c:"text-lightGreenTwo"},warning:{bg:"bg-warningBG",fc:"text-yellowLight",sum_heading:"Warning",sum_subheading:"Proceed with caution.",title:"WARNING",title_bg:"bg-yellowLight",title_c:"text-warningC"},failed:{bg:"bg-failedBG",fc:"text-pinkLightThree",sum_heading:"Honeypot Detected",sum_subheading:"Run the fuck away.",title:"FAILED",title_bg:"bg-pink",title_c:"pinkLight"},unknown:{bg:"bg-unknownBG",fc:"text-gray",sum_heading:"Unknown",sum_subheading:"Could not determine if this is a honeypot.",title:"UNKNOWN",title_bg:"bg-lightGray",title_c:"text-grayTwo"}},readable_warnings={TRANSFER_BLOCKED:"Transfers between normal wallets is blocked.",HIGH_BUY_GAS:"The gas required to buy the token is extremely high. TX Fees will be very expensive.",HIGH_SELL_GAS:"The gas required to sell the token is extremely high. TX Fees will be very expensive.",HIGH_BUY_TAX:"The buy tax is really high.",HIGH_SELL_TAX:"The sell tax is really high.",EXTREMELY_HIGH_TAXES:"The taxes on this token are extremely high. You will get significantly less from a trade than expected, be careful!",high_siphon_rate:"A lot of users' wallets were siphoned. This is likely a honeypot.",medium_siphon_rate:"Some of users' wallets were siphoned. This could be a honeypot.",high_fail_rate:"A very high amount of users can not sell their tokens. This is likely a honeypot.",medium_fail_rate:"A high amount of users can not sell their tokens. This is likely a honeypot.",low_fail_rate:"Some users can not sell their tokens. This could be a honeypot.",high_tax:"The average tax is very high. Be careful!",medium_tax:"The average tax is quite high.",high_gas:"The gas usage for selling is very high. This means the TX cost for selling will be high.",medium_gas:"The gas usage for selling is quite high. This means the TX cost for selling will be high."};function prettyNumber(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function style(a){if(a.simulationSuccess==!0&&a.simulationResult.isHoneypot===!1)return"lightGreen"}function titlePanel(a){return`<div id="titlePanel" class="flex items-center justify-center ${a.props.title_bg}">
    <h3 id="titlePanel-heading" class=" ">
        ${a.props.title}
    </h3>
    </div>`}function chainName(){if(chainID()==56)return"bsc";return chainID()==1?"ethereum":"unknown"}function explorerName(a){if(a.chain.id==56)return"BSCSCAN";return a.chain.id==1?"ETHERSCAN":"?SCAN"}function explorerNameLower(a){if(a.chain.id==56)return"bscscan";return a.chain.id==1?"etherscan":"?SCAN"}function chartname(a){if(a.chain.id==56)return"geckobsc";return a.chain.id==1?"gecko":"unknownchart"}function explorerURL(){if(chainID()==56)return"https://bscscan.com/";return chainID()==1?"https://etherscan.io/":"?SCAN"}function explorerLink(a){if(a.chain.id==56)return`https://bscscan.com/address/${a.token.address}`;return a.chain.id==1?`https://etherscan.io/address/${a.token.address}`:"UNSUPPORTED CHAIN"}function chartLink(a){if(a.chain.id==56)return`https://www.geckoterminal.com/bsc/pools/${a.pairAddress}?utm_source=web_button&utm_medium=honeypotis&utm_campaign=honeypotis`;return a.chain.id==1?`https://www.geckoterminal.com/eth/pools/${a.pairAddress}?utm_source=web_button&utm_medium=honeypotis&utm_campaign=honeypotis`:"UNSUPPORTED CHAIN"}function cornerItems(a){return`<div class="space-y-2">
    <a href="${explorerLink(a)}" target="_blank" class="border-1 text-md flex h-10 min-w-[150px] items-center justify-center rounded-md border border-gray px-4 py-2 font-adventPro font-bold uppercase tracking-widest
     text-white transition hover:border-secondary hover:bg-secondary md:text-lg plausible-event-name=${explorerNameLower(a)}">
        <img src="assets/img/scan.png" alt="" class="mr-2 h-5" />
        ${explorerName(a)}
    </a>
     <a href="${chartLink(a)}" target="_blank" class="border-1 text-md flex h-10 min-w-[150px] items-center justify-center rounded-md border border-gray px-4 py-2 font-adventPro font-bold uppercase tracking-widest
      text-white transition hover:border-secondary hover:bg-secondary md:text-lg plausible-event-name=${chartname(a)}">
        <img src="assets/img/chart.png" alt="" class="mr-2 h-5" />
        CHART
    </a>
    </div>
</div>`}function info(a,b,c,e=!1,f=null){let g="text-2xl";e==!0&&(g="text-xl");let h="";return f!=null&&(h=`id="${f}" `),`<li class="border-l-4 border-[#A6906C] pl-2.5 pb-4">
    <h4 ${h} class="font-bebasNeue text-xl uppercase ${a.props.fc}">
    ${b}
    </h4>
    <p class="font-bebasNeue ${g} uppercase leading-none text-white">
    ${c}
    </p>
</li>`}function resultInfo(a){return ot="",a.simulationSuccess==!1&&(ot+=resultInfoUnknown(a)),a.honeypotResult!=null&&a.honeypotResult.isHoneypot==!0&&(ot+=resultInfoFailed(a)),a.flags.length>0&&(ot+=resultInfoWarning(a)),a.simulationResult!=null&&(ot+=simulationResult(a)),a.holderAnalysis!=null&&(ot+=holderAnalysis(a)),ot}function resultInfoUnknown(a){return`<div class="mb-8">
    <h2 class="font-bebasNeue text-xl uppercase ${a.props.fc}">
      REASON
    </h2>
    <p class="leading-1 font-bebasNeue text-2xl uppercase text-white">
      ${a.simulationError}
    </p>
  </div>`}function resultInfoFailed(a){return`<div class="mb-8">
    <h2 class="font-bebasNeue text-xl uppercase ${a.props.fc}">
      Execution Reverted
    </h2>
    <p class="leading-1 font-bebasNeue text-2xl uppercase text-white">
      ${a.honeypotResult.honeypotReason}
    </p>
  </div>`}function buildWarnings(a){let b="";for(let c=0;c<a.length;c++){if(readable_warnings[a[c]]==null){b+=`<li><p class="leading-1 font-bebasNeue text-pinkLight text-xl uppercase">${a[c]}</p></li>`;continue}b+=`<li><p class="leading-1 font-bebasNeue text-pinkLight text-xl">${readable_warnings[a[c]]}</p></li>`}return b}function resultInfoWarning(a){return`<div class="mb-8">
    <h2 class="font-bebasNeue text-xl uppercase ${a.props.fc}">
      Warnings
    </h2>
    <ul>
      ${buildWarnings(a.flags)}
    </ul>
    </div>`}function maxTX(a,b){return b==null||b==null?"NONE DETECTED":`${prettyPrintLiq(+b.token)} ${a.token.symbol}</p><p class="font-bebasNeue text-xl uppercase leading-none text-white"> ${prettyPrintLiq(+b.withToken)} ${a.withToken.symbol}`}function contractVerificationTooltip(){let a="<ul class=\"font-mono pl-2 list-disc\">";let b=!1;return contractResults.originalVerified&&contractResults.hasNonVerified&&(a+="<li>While the token contract itself is open source, the contract CALLS closed source contracts. This effectively makes the contract closed source as it hides all of the code. This is a big red flag, proceed with caution.</li>",b=!0),contractResults.hasProxy&&(a+=contractResults.hasNonVerified?"<li>The token contract is a proxy. The target is closed source. This is a big red flag, proceed with caution.</li>":"<li>While the token's contract is a proxy, the target contract is open source.</li>",b=!0),a+="<li><a id=\"view_calls\" style=\"cursor: pointer;\" onclick=\"return ViewCalls();\" class=\"font-bold text-primary underline\">View Calls</a></li>",a+="</ul>",b?`
    <div class="group relative h-6 w-6">
    <svg class="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
    <span class="absolute hidden group-hover:flex -left-[42px] top-[8px] -translate-y-full w-24 h-6 px-2 py-1"></span>
    <span
        class="absolute hidden group-hover:flex -left-[90px] lg:-left-[131px] -top-2 -translate-y-full w-52 md:w-72 px-2 py-1 bg-gray-700 rounded-lg text-left text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">${a}</span>
    
    </div>
`:""}ViewCalls=function(){return showModal(createViewCallModal()),!1};function verifiedContract(){if(!contractResults.checked)return`<svg id="loading-contracts-svg" class="animate-spin mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>`;if(contractResults.hasNonVerified){let a=document.getElementById("titlePanel");let b=!0;if(a!==null&&a.innerText=="FAILED"&&(b=!1),a!==null&&b){a.classList.add("transition","ease-in-out","duration-300","-translate-y-1","scale-110"),a.classList.remove("bg-passedGreen"),a.classList.add("bg-yellowLight");let b=document.getElementById("titlePanel-heading");b.classList.remove("text-lightGreenTwo"),b.classList.add("text-warningC"),b.innerText="WARNING",setTimeout(function(){a.classList.add("transition","ease-in-out","duration-300","-translate-y-1","scale-100"),setTimeout(function(){a.classList.remove("transition","ease-in-out","duration-300","-translate-y-1","scale-110","scale-100")},300)},300)}let c=document.getElementById("results-panel-vc");c!==null&&(c.classList.add("transition","ease-in-out","duration-300","-translate-y-1","scale-110","text-pinkLightThree"),setTimeout(function(){c.classList.add("transition","ease-in-out","duration-300","-translate-y-1","scale-100"),setTimeout(function(){c.classList.remove("transition","ease-in-out","duration-300","-translate-y-1","scale-110","scale-100")},300)},300));let e=document.getElementById("summary-heading");e!==null&&b&&animChangeText(e,"WARNING",function(){e.classList.remove("text-lightGreen"),e.classList.add("text-yellowLight")});let f=document.getElementById("summary-subheading");return f!==null&&b&&animChangeText(f,"CONTRACT IS CLOSED SOURCE. PROCEED WITH CAUTION.",null),`<svg class="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
      </svg>${contractVerificationTooltip()}<span class="font-bebasNeue text-xl uppercase m-auto mt-[3px] ml-1 mr-0 leading-none text-white">CLOSED SOURCE</span>`}return`<svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
    </svg>${contractVerificationTooltip()}<span class="font-bebasNeue text-xl m-auto mt-[3px] ml-1 mr-0 uppercase leading-none text-white">OPEN SOURCE</span>`}function animChangeText(a,b,c){let e=a.innerText.trim();let f=!1;let g=null;let h=0;g=function(){if(f||e.length!=1||(f=!0,c!==null&&c()),f||(e=e.substr(0,e.length-1)),f){if(h++,h>b.length)return;e=b.substr(0,h)}a.innerText=e,setTimeout(g,8)},setTimeout(g,20)}function verifiedContractDiv(){return`<div id="verified-contracts-d" class="inline-block align-middle flex flex-shrink-0">${verifiedContract()}</div>`}function simulationResult(a){return`
    <h2 class="font-bebasNeue text-xl uppercase ${a.props.fc}">
    Simulation Results
    </h2>
    <ul><div class="grid grid-cols-[1fr_1fr] gap-0 md:grid-cols-[1fr_1fr_1.5fr]">
    ${info(a,"Buy Tax",a.simulationResult.buyTax.toFixed(1)+"%")}
    ${info(a,"Buy Gas",prettyNumber(a.simulationResult.buyGas))}
    ${info(a,"Buy Limit",maxTX(a,a.simulationResult.maxBuy),!0)}
    ${info(a,"Sell Tax",a.simulationResult.sellTax.toFixed(1)+"%")}
    ${info(a,"Sell Gas",prettyNumber(a.simulationResult.sellGas))}
    ${info(a,"Sell Limit",maxTX(a,a.simulationResult.maxSell),!0)}
    ${info(a,"Transfer Tax",a.simulationResult.transferTax.toFixed(1)+"%")}
    ${info(a,"Source Code",verifiedContractDiv(),!1,"results-panel-vc")}
    </div>
    </ul>
    `}function holderAnalysis(a){return highTaxAccounts="",parseInt(a.holderAnalysis.highTaxWallets)>0&&(highTaxAccounts=info(a,"Extremely High Tax Holders",prettyNumber(a.holderAnalysis.highTaxWallets),!1)),`
    <div class="mt-8 truncate">
    <h2 class="font-bebasNeue text-xl uppercase ${a.props.fc}">
    Recent Holder Analysis <span class="ml-2 text-white underline" </span>
    </h2>
    <ul><div class="grid grid-cols-[1fr_1fr] gap-0 md:grid-cols-[1fr_1fr_1.5fr]">
    ${info(a,"Holders Analysed",prettyNumber(a.holderAnalysis.holders))}
    ${info(a,"Can Sell",prettyNumber(a.holderAnalysis.successful))}
    ${info(a,"Can't sell",prettyNumber(a.holderAnalysis.failed))}
    ${info(a,"Siphoned",prettyNumber(a.holderAnalysis.siphoned))}
    ${info(a,"Average Tax",prettyNumber(a.holderAnalysis.averageTax.toFixed(1))+"%")}
    ${info(a,"Highest Tax",prettyNumber(a.holderAnalysis.highestTax.toFixed(1))+"%")}
    ${info(a,"Average Gas",prettyNumber(a.holderAnalysis.averageGas.toFixed(0)))}
    ${highTaxAccounts}
    </div>
    </ul>
    </div>
    `}function addressDisplay(a){return`<div class="mb-8 truncate">
    <h2 class="font-bebasNeue text-xl uppercase ${a.props.fc}">
    Address
    </h2>
    <p class="leading-1 max-w-xl truncate font-bebasNeue text-2xl uppercase text-white">
    ${a.token.address}
    </p>
</div>`}function summary(a){return`<div class="mb-8">
    <h2 id="summary-heading" class="font-bebasNeue text-4xl uppercase leading-none ${a.props.fc} lg:text-5xl xl:text-[45px]">
    ${a.props.sum_heading}
    </h2>
    <p id="summary-subheading" class="leading-1 font-bebasNeue text-xl uppercase text-pinkLightTwo">
    ${a.props.sum_subheading}
    </p>
    </div>`}function tokenInfo(a){return`<h3 class="font-bebasNeue text-3xl ${a.props.fc} md:text-4xl lg:text-[40px]">
    <div id="tname"></div>
    <span id="tsymbol" class="block text-xl text-white md:mt-2 md:text-4xl lg:mt-2 lg:text-[30px]">
        ()
    </span>
    </h3>`}function printTinyNumber(a){let b=a.toFixed(32);let c=b.match(/^(0\.(?:0*[1-9]{1}[0-9]{0,1}))/);return c?c[1].replace(/0+$/,""):a.toFixed(2).replace(/\.00$/,"")}function prettyPrintLiq(a){if(a<1)return printTinyNumber(a);if(a<100)return a.toFixed(2);if(a<1e5)return a.toLocaleString(void 0,{maximumFractionDigits:0});if(a<1e6-.5*1e3){let b=(a/1e3).toFixed(1);return b.replace(/.0$/,"")+"K"}if(a<1e7){let b=(a/1e6).toFixed(2);return b.replace(/(.\d*[1-9])0+$/,"$1").replace(/.00$/,"")+"M"}if(a<1e8){let b=(a/1e6).toFixed(1);return b.replace(/.0$/,"")+"M"}return(a/1e6).toLocaleString(void 0,{maximumFractionDigits:0})+"M"}function createOopsAlert(a){d=`<div class="space-y-5 mb-5">
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
        <svg class="h-7 w-7 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
        </div>
        <div class="ml-3">
          <p class="text-xl font-bold text-yellow-700">
            <span class="uppercase">OOPS!</span>
            <span class="pl-2 text-base text-yellow-700 font-mono"> ${a}</a>
          </p>
        </div>
      </div>
    </div>`,document.getElementById("hp_alerts").innerHTML=d}function createErrorAlert(a){d=`<div class="space-y-5 mb-5">
    <div class="bg-red-50 border-l-4 border-red-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-7 w-7 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-xl font-bold text-red-700">
            <span class="uppercase">Error:</span>
            <span class="pl-2 text-base text-red-700 font-mono"> ${a}</a>
          </p>
        </div>
      </div>
    </div>`,document.getElementById("hp_alerts").innerHTML=d}function hideAlerts(){document.getElementById("hp_alerts").innerHTML=""}function setLoading(a){document.getElementById("check4hp").disabled=a,a?(document.getElementById("check4hp").classList.add("cursor-not-allowed"),document.getElementById("loading-circle").classList.remove("invisible")):(document.getElementById("check4hp").classList.remove("cursor-not-allowed"),document.getElementById("loading-circle").classList.add("invisible"))}function clearResults(){document.getElementById("hp_info_box").innerHTML="",document.getElementById("hp_pair_selector").innerHTML=""}function pairselector(a){let b=!0;let c="";let e=!1;for(let f=0;f<a.length;f++){if(pairsAddress[a[f].Pair.Address.toLowerCase()]=a[f].Pair.Name,b){c+=`<option value="${a[f].Router},${a[f].Pair.Address}" selected>${a[f].Pair.Name}  (Liquidity: \$${prettyPrintLiq(a[f].Liquidity)})</option>`,a[f].Liquidity>1&&(e=!0),b=!1;continue}c+=`<option value="${a[f].Router},${a[f].Pair.Address}">${a[f].Pair.Name}  (Liquidity: \$${prettyPrintLiq(a[f].Liquidity)})</option>`}return a.length!=0&&e||(a.length==0?c+=`<option value="simulate,simulate" selected>Try to Simulate Liquidity</option>`:c+=`<option value="simulate,simulate">Try to Simulate Liquidity</option>`),`<div class="selection-type-2">
    <select name="" id="pair_selector">
      ${c}
    </select>
    </div>`}function createBox(a){html=`
<div class="greens">
        ${titlePanel(a)}
        <div class="${a.props.bg} px-5 py-5 md:px-8 md:py-8 lg:px-11 lg:py-10">
        <div class="mb-8 flex items-center justify-between">

        ${tokenInfo(a)}

        ${cornerItems(a)}
        ${summary(a)}

        ${addressDisplay(a)}

        ${resultInfo(a)}
        </div>
    </div>
    `;const b=document.createElement("div");b.innerHTML=html,document.getElementById("hp_info_box").innerHTML="",document.getElementById("hp_info_box").appendChild(b),document.getElementById("tname").innerText=a.token.name,document.getElementById("tsymbol").innerText=`(${a.token.symbol})`,tippy("#whats_this",{content:"<span class=\"text-white text-base\">Honeypot.is analyses the last buyers of the token to check if they can sell or not. Each wallet is checked multiple times at different intervals. <br>Siphoned means the user's tokens disappeared without them sending.</span>",interactive:!0,allowHTML:!0})}function getContractVer(a,b,c){var e=new XMLHttpRequest;b=="simulate"?e.open("GET",`${api_url}GetContractVerification?address=${a}&forceSimulateLiquidity=true&chainID=${chainID()}`,!0):a==c?e.open("GET",`${api_url}GetContractVerification?address=${a}&chainID=${chainID()}`,!0):e.open("GET",`${api_url}GetContractVerification?address=${a}&pair=${c}&chainID=${chainID()}`,!0),e.responseType="json",e.onload=function(){var f=e.status;if(f===200){let f={checked:!0,hasProxy:!1,hasNonVerified:!1,originalVerified:!1,verifiedContracts:[],unverifiedContracts:[]};let g=e.response;for(const b in f.hasProxy=g.HasProxyCalls,g.Contracts)b.toLowerCase()==a.toLowerCase()&&(f.originalVerified=g.Contracts[b]),g.Contracts[b]==!1?(f.hasNonVerified=!0,f.unverifiedContracts.push(b)):f.verifiedContracts.push(b);updateContractVer(a,b,c,f)}else{if(e.response.error!==void 0)return void console.log("could not retrieve contract verification: "+e.response.error);console.log("could not retrieve contract verification: "+f)}},e.send()}let curCheck={token:"",router:"",pair:""};let contractResults={checked:!1,hasProxy:!1,hasNonVerified:!1,originalVerified:!1,verifiedContracts:[],unverifiedContracts:[]};let pairsAddress={};function updateContractVer(a,b,c,e){if(curCheck.token==a&&curCheck.router==b&&curCheck.pair==c){contractResults=e;let a=document.getElementById("verified-contracts-d");a!==null&&(a.innerHTML=verifiedContract())}}function getHoneypot(a,b,c){hideHolders(),getTokenInfo(a),getHoldersInfo(a),getLiqHoldersInfo(c);var e=new XMLHttpRequest;b=="simulate"?e.open("GET",`${API_URL}/v2/IsHoneypot?address=${a}&forceSimulateLiquidity=true&chainID=${chainID()}`,!0):a==c?e.open("GET",`${API_URL}/v2/IsHoneypot?address=${a}&chainID=${chainID()}`,!0):e.open("GET",`${API_URL}/v2/IsHoneypot?address=${a}&pair=${c}&chainID=${chainID()}`,!0),e.responseType="json",e.onload=function(){var f=e.status;if(f===200){let f=e.response;let g="unknown";if(f.simulationSuccess==!1?g="unknown":f.honeypotResult.isHoneypot===!1?(g="passed",f.flags!==null&&f.flags.length>0&&(g="warning")):f.honeypotResult.isHoneypot===!0&&(g="failed"),f.status=g,f.props=props[g],g=="warning"){let a=!1;for(const b of f.flags)b=="EXTREMELY_HIGH_TAXES"&&(a=!0);f.props.bg=a?"bg-failedBG":"bg-warningBG"}createBox(f),contractResults.checked&&updateContractVer(a,b,c,contractResults)}else{if(e.response.error!==void 0)return void showAlert(e.response.error);createErrorAlert("Something went wrong. Please try again later. Status code: "+f)}},e.send()}function chainID(){return document.getElementById("hp_chainid").dataset.chainid}function getPairs(){let a=document.getElementById("address").value;var b=new XMLHttpRequest;b.open("GET",api_url+`GetPairs?address=${a}&chainID=${chainID()}`,!0),b.responseType="json",b.onerror=function(){setLoading(!1),createErrorAlert("Something went wrong. Please try again later.")},b.onload=function(){setLoading(!1);var c=b.status;if(c===200){if(b.response.length==0){document.getElementById("hp_pair_selector").innerHTML=pairselector(b.response);let c=new BVSelect({selector:"#pair_selector"});document.getElementById("pair_selector").onchange=function(){document.getElementById("hp_info_box").innerHTML="";let b=this.value.split(",");curCheck={token:a,router:b[0],pair:b[1]},contractResults={checked:!1,hasProxy:!1,hasNonVerified:!1},getHoneypot(a,b[0],b[1]),getContractVer(a,b[0],b[1])},curCheck={token:a,router:"simulate",pair:"simulate"},contractResults={checked:!1,hasProxy:!1,hasNonVerified:!1},getHoneypot(a,"simulate","simulate"),getContractVer(a,"simulate","simulate")}if(b.response.length>0){document.getElementById("hp_pair_selector").innerHTML=pairselector(b.response);let c=new BVSelect({selector:"#pair_selector"});document.getElementById("pair_selector").onchange=function(){document.getElementById("hp_info_box").innerHTML="";let b=this.value.split(",");curCheck={token:a,router:b[0],pair:b[1]},contractResults={checked:!1,hasProxy:!1,hasNonVerified:!1},getHoneypot(a,b[0],b[1]),getContractVer(a,b[0],b[1])},curCheck={token:a,router:b.response[0].Router,pair:b.response[0].Pair.Address},contractResults={checked:!1,hasProxy:!1,hasNonVerified:!1},getHoneypot(a,b.response[0].Router,b.response[0].Pair.Address),getContractVer(a,b.response[0].Router,b.response[0].Pair.Address)}else createOopsAlert("No pairs found for this address. Trying to simulate liquidity")}else{if(b.response!==void 0&&b.response!=null&&b.response.error!==void 0)return void createErrorAlert(b.response.error);createErrorAlert("Something went wrong. Please try again later. Status code: "+c)}},b.send()}function checkHP(a="unknown"){clearResults(),hideAlerts(),setLoading(!0),getPairs(),a==null&&(a="unknown");let b=document.getElementById("address").value.toLowerCase();window.plausible==null?setTimeout(function(){window.plausible!=null&&window.plausible("Check Honeypot",{props:{chain:chainName(),source:a,address:b}})},1e3):window.plausible("Check Honeypot",{props:{chain:chainName(),source:a,address:b}})}document.getElementById("check4hp").addEventListener("click",function(){if(checkHP("button"),history.pushState){var a=window.location.protocol+"//"+window.location.host+window.location.pathname+"?address="+document.getElementById("address").value;return void window.history.pushState({path:a},"",a)}const b=new URLSearchParams(window.location.search);b.set("address",document.getElementById("address").value),window.location.search=b});var ethBanners=["GT-banners_728x90.jpg"];function doForm(){element=document.getElementById("hp_form"),element.addEventListener?element.addEventListener("submit",function(a){a.preventDefault(),window.history.back(),checkHP("form")},!0):element.attachEvent("onsubmit",function(a){a.preventDefault(),window.history.back(),checkHP("form")})}function onLoad(){updateBanner(),doForm()}function updateBanner(){if(banners=[],prefix="",chainID()=="56inactive")banners=apespaceBanners,prefix="apespace";else return banners=ethBanners,void(prefix="gecko");if(banners.length!=0){let a=Math.floor(Math.random()*banners.length);let b=document.getElementsByName("abanner1");for(let c=0;c<b.length;c++)b[c].src="assets/media/"+prefix+"/"+banners[a]}}const urlParams=new URLSearchParams(window.location.search);let address=urlParams.get("address");address!==null&&(document.getElementById("address").value=address,checkHP("autoload")),window.onload=updateBanner,setInterval(function(){updateBanner()},6050);function createViewCallModal(){let a="";let b="";let c="";chainID()=="56"?c="https://bscscan.com/address/":chainID()=="1"&&(c="https://etherscan.io/address/");for(let b=0;b<contractResults.verifiedContracts.length;b++){let e=contractResults.verifiedContracts[b];a+=`<p><a href="${c}${e}" class="text-sm font-underline plausible-event-name=verified+explorer+link">${e}</a></p>`}for(let a=0;a<contractResults.unverifiedContracts.length;a++){let e=contractResults.unverifiedContracts[a];b+=`<p><a href="${c}${e}" class="text-sm font-underline plausible-event-name=unverified+explorer+link">${e}</a></p>`}return`
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-gray-700 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
            <div>
              <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-2xl font-mono text-white font-bold font-medium leading-6" id="modal-title">Calls</h3>
                <div class="mt-2 text-white">
                  <p class="text-base font-bold font-underline">Open Source Contracts:</p>
                    ${a}
                </div>
                <div class="mt-2 text-white">
                  <p class="text-base font-bold font-underline">Closed Source Contracts:</p>
                  ${b}
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button type="button" onclick="hideModal();" class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `}function showModal(a){document.getElementById("modal-ele").innerHTML=a,document.getElementById("mainbody").classList.add("overflow-hidden")}hideModal=function(){document.getElementById("modal-ele").innerHTML="",document.getElementById("mainbody").classList.remove("overflow-hidden")};let curTokenInfo=null;let holdersInfo=null;let lastToken=null;function getTokenInfo(a){if(lastToken!=a){lastToken=a;var b=new XMLHttpRequest;b.open("GET",`${api_url}TokenInfo?address=${a}&chainID=${chainID()}`,!0),b.responseType="json",b.onload=function(){var a=b.status;if(a===200)curTokenInfo=b.response,showHolders();else{if(b.response.error!==void 0)return void showAlert(b.response.error);createErrorAlert("Something went wrong. Please try again later. Status code: "+a)}},b.send()}}function getHoldersInfo(a){var b=new XMLHttpRequest;b.open("GET",`${api_url}TopHolders?address=${a}&chainID=${chainID()}`,!0),b.responseType="json",b.onload=function(){var a=b.status;if(a===200)holdersInfo=b.response,showHolders();else{if(b.response.error!==void 0)return void showAlert(b.response.error);createErrorAlert("Something went wrong. Please try again later. Status code: "+a)}},b.send()}function hideHolders(){let a=document.getElementById("top_holder_sidebar");a.innerHTML=""}function showHolders(){if(curTokenInfo!=null&&holdersInfo!=null){let a=document.getElementById("top_holder_sidebar");a.innerHTML=buildTopHolderSidebar(holdersInfo.holders)}}function weiToCurrency(a,b){const c=10**b;const e=a/c;return e}function contractIcon(){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="flex-shrink-0 w-4 h-4 mr-1 mt-1 align-middle">
    <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clip-rule="evenodd" />
    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
  </svg>`}function buildHolderInSidebar(a,b){let c=Math.round(b.balance/a.TotalSupply*100);let e=c;c>100&&(c=100);let f=100-c;let g=b.address;let h="";b.alias!=""&&(g=b.alias),b.address==a.Address&&(g="Token Contract: "+a.Name),pairsAddress[b.address.toLowerCase()]!==void 0&&(g=pairsAddress[b.address.toLowerCase()],h="bg-[#6a5c3f]");let i="";return b.isContract&&(i=contractIcon()),`<div class="mt-3 mb-5 relative ${h} px-5">
    <div class="flex">
        ${i}<a href="${explorerURL()}token/${a.Address}?a=${b.address}" class="text-left text-lightGreen text-sm font-normal">${g}</a>
    </div>
        <p class="text-white flex justify-between">
        <span class="text-left">${prettyPrintLiq(weiToCurrency(b.balance,a.Decimals))} ${a.Symbol}</span>
        <span class="text-right">${e}%</span>
        </p>
        <div class="mt-1 relative h-[4px]">
        <span class="absolute bg-red-500 h-full" style="width: ${c}%; left: 0;"></span>
        <span class="absolute bg-[#A6906C] h-full" style="width: ${f}%; left: ${c}%;"></span>
        </div>
    </div>`}function buildTopHolderSidebar(a){let b=0;for(let c=0;c<a.length;c++)b+=parseInt(a[c].balance);let c=curTokenInfo;b>c.TotalSupply&&(c.TotalSupply=b);let e="";for(let b=0;b<a.length;b++)e+=buildHolderInSidebar(curTokenInfo,a[b]);return`
    <div class="block rounded-md overflow-hidden bg-secondaryLight">
        <div class="flex items-center justify-center bg-lightGreen">
        <h3 class="py-2 pr-3 pt-3 font-bebasNeue text-3xl font-normal leading-none text-green">
            TOP HOLDERS
        </h3>
        </div>
        <div class="max-h-[750px] overflow-y-scroll bg-secondaryLight py-2" style="scrollbar-width:thin;">
        ${e}
        </div>
    </div>`}let liqHoldersInfo=null;function getLiqHoldersInfo(a){var b=new XMLHttpRequest;b.open("GET",`${api_url}TopHolders?address=${a}&chainID=${chainID()}`,!0),b.responseType="json",b.onload=function(){var c=b.status;if(c===200)liqHoldersInfo={address:a,holders:b.response.holders,totalSupply:b.response.totalSupply},showLiqHolders();else{if(b.response.error!==void 0)return void showAlert(b.response.error);createErrorAlert("Something went wrong. Please try again later. Status code: "+c)}},b.send()}function hideLiqHolders(){let a=document.getElementById("top_liqholder_sidebar");a.innerHTML=""}function showLiqHolders(){if(liqHoldersInfo!=null){let a=document.getElementById("top_liqholder_sidebar");a.innerHTML=buildLiqTopHolderSidebar(liqHoldersInfo.address,liqHoldersInfo.holders,liqHoldersInfo.totalSupply)}}function buildLiqHolderInSidebar(a,b,c){typeof c!="number"&&(c=parseInt(c));let e=Math.round(parseInt(b.balance)/c*100);let f=e;e>100&&(e=100);let g=100-e;let h=b.address;b.alias!=""&&(h=b.alias),pairsAddress[b.address.toLowerCase()]!==void 0&&(h=pairsAddress[b.address.toLowerCase()]);let i="";return b.isContract&&(i=contractIcon()),`<div class="mt-3 mb-5 relative">
    <div class="flex">${i}<a href="${explorerURL()}token/${a}?a=${b.address}" class="text-left text-lightGreen text-sm font-normal">${h}</a></div>
        <p class="text-white flex justify-between">
        <span class="text-left">${prettyPrintLiq(weiToCurrency(b.balance,18))}</span>
        <span class="text-right">${f}%</span>
        </p>
        <div class="mt-1 relative h-[4px]">
        <span class="absolute bg-red-500 h-full" style="width: ${e}%; left: 0;"></span>
        <span class="absolute bg-[#A6906C] h-full" style="width: ${g}%; left: ${e}%;"></span>
    </div>`}function buildLiqTopHolderSidebar(a,b,c){let e=0;for(let f=0;f<b.length;f++)e+=parseInt(b[f].balance);e>parseInt(c)&&(c=e);let f="";for(let e=0;e<b.length;e++)f+=buildLiqHolderInSidebar(a,b[e],c);return`
    <div class="block rounded-md overflow-hidden bg-secondaryLight">
        <div class="flex items-center justify-center bg-lightGreen">
        <h3 class="py-2 pr-3 pt-3 font-bebasNeue text-3xl font-normal leading-none text-green">
            LIQUIDITY HOLDERS
        </h3>
        </div>
        <div class="max-h-[750px] overflow-y-scroll bg-secondaryLight px-5 py-2" style="scrollbar-width:thin;">
        ${f}
        </div>
    </div>`}