import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const CaptchaAccessibleProviderV2_2Failure = () => {
  const ruleId = "captcha-accessible-provider-v2.2";
  const title = `CAPTCHA used in authentication should not involve cognitive function tests`;
  const description = `With the exception of challenges that require recognition of  objects that are generally familiar to users, CAPTCHA used during authentication should not require users to perform cognitive function tests, such as recalling site-specific passwords or solving a puzzle.`;
  const helpText = `Provide an alternative authentication method that avoids cognitive tasks, such as a two-factor verification step. If CAPTCHA is required, use services that offer strong accessibility support, such as Google reCAPTCHA v3.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "form cloudflare turnstile", content: `<form class="_widgetForm_1f3oo_26" novalidate="">
  <ul class="_list_1jhf1_1">
    <li class="_listItem_1jhf1_12"><a
      class="_listItemLink_1jhf1_17 _listItemLinkActive_1jhf1_23 _link_uqqxn_1 _linkWithExplicitUnderline_uqqxn_15"
      href="/demo/cloudflare-turnstile">Cloudflare Turnstile</a></li>
    <li class="_listItem_1jhf1_12"><a class="_listItemLink_1jhf1_17 _link_uqqxn_1 _linkWithExplicitUnderline_uqqxn_15"
                                      href="/demo/cloudflare-turnstile-challenge">Cloudflare Challenge</a></li>
  </ul>
  <div id="cf-turnstile" style="width:300px;height:65px" class="cf-turnstile" data-sitekey="0x4AAAAAAAVrOwQWPlm3Bnr5">
    <iframe
      src="https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/g/turnstile/if/ov2/av0/rcv0/0/9miu0/0x4AAAAAAAVrOwQWPlm3Bnr5/auto/normal"
      allow="cross-origin-isolated; fullscreen; autoplay" sandbox="allow-same-origin allow-scripts allow-popups"
      id="cf-chl-widget-9miu0" tabindex="0" title="Widget containing a Cloudflare security challenge"
      style="border: none; overflow: hidden; width: 300px; height: 65px;"></iframe>
    <input type="hidden" name="cf-turnstile-response" id="cf-chl-widget-9miu0_response"
           value="0.5nz279hMMHnaTMjdsMatIrgN40B0vtcmM6Ml6NNKfiHtwz2e-dnUJhfY69v8Tqy3a5qkaBHeutcSy9ml7dSb72LWP9YHFbSqxrkO4IeLP6kbUjns5gPQHCThSGyuQrOGwftAgjbIEVtNLQ3EFa_02e7kLRp3YLB2VTho77Eu1glcBt4swqxMZABJcGtxrIntpTMRRFZKp_YZQCvM5TP5_VrHoHIAYm99Qyj-jnqzwhtuYy48sOqdCPOVo3a5koCPtf1XlJjEyQBEJL1FzuhYG_RhQfEfLcsx5IkaSugZCREuXPOSvhQpOxSfj9QvAwZk5I3u_7GrgUI6vJt-7rSTaxnizYGNpa9dep7j3cdds-Wo6NJo7yk_AZVZGtKKUeDf8N-_yFwGjZAViqVFlqVuIMQsNEEa2FzVNseiOSaHslw.ITFQvOpiFTWYvnq5RQ8jQQ.dff1552586ae31d8cf213ee755990bfb534a92c9399ae1b72a79bab3b09ba824">
  </div>
  <div class="_actions_1f3oo_36">
    <button type="submit" class="_actionsItem_1f3oo_41 _buttonPrimary_d46vc_44 _button_d46vc_1 _buttonMd_d46vc_34"
            data-action="demo_action">Check
    </button>
    <button type="button" class="_actionsItem_1f3oo_41 _buttonSecondary_d46vc_143 _button_d46vc_1 _buttonMd_d46vc_34">
      Reset
    </button>
  </div>
</form>` },
  { filename: "form custom captcha", content: `<form class="_widgetForm_1f3oo_26" novalidate="">
  <div id="test-subject" class="_captchaWidgetContainer_1f3oo_22"><img class="_captchaImage_rrn3u_9"
                                                                       src="/dist/web/assets/captcha-rn1S3orp.jpg"
                                                                       alt="normal captcha example" width="250"
                                                                       height="50">
    <div class="_input_ws73z_1 _captchaField_rrn3u_5 _inputColorNightRider_ws73z_25"><label for="simple-captcha-field"
                                                                                            class="_inputLabel_ws73z_5">Enter
      text from the image</label><input type="text" class="_inputInner_ws73z_12" id="simple-captcha-field"
                                        name="simpleCaptcha" placeholder="Enter answer here..." autocomplete="off"
                                        value=""></div>
  </div>
  <div class="_actions_1f3oo_36">
    <button type="submit" class="_actionsItem_1f3oo_41 _buttonPrimary_d46vc_44 _button_d46vc_1 _buttonMd_d46vc_34"
            data-action="demo_action">Check
    </button>
    <button type="button" class="_actionsItem_1f3oo_41 _buttonSecondary_d46vc_143 _button_d46vc_1 _buttonMd_d46vc_34">
      Reset
    </button>
  </div>
</form>` }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default CaptchaAccessibleProviderV2_2Failure;
