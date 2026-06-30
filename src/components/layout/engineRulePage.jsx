import PropTypes from "prop-types";
import UnifiedRulePage from "./UnifiedRulePage";

/** Thin wrapper — all engine rule routes use the shared flat detail layout. */
function EngineRulePage({ ruleData }) {
  return <UnifiedRulePage ruleData={ruleData} ruleType="engine" />;
}

EngineRulePage.propTypes = {
  ruleData: PropTypes.object.isRequired,
};

export default EngineRulePage;
