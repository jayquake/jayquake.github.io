import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const CaptchaAccessibleProviderV2_0Failure = () => {
  const ruleId = "captcha-accessible-provider-v2.0";
  const title = `An alternative modality should be provided for CAPTCHA challenges`;
  const description = `Visual-only or audio-only CAPTCHA can block users who cannot perceive certain formats. Providing a text alternative and another equivalent modality ensures that people with different sensory needs can complete the challenge.`;
  const helpText = `Ensure that both a text alternative and a second modality are available for CAPTCHA challenges. Use CAPTCHA services that offer strong accessibility support, such as Google reCaptcha v2 or v3.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
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

export default CaptchaAccessibleProviderV2_0Failure;
