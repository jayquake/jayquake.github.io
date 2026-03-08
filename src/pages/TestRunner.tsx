import TestLibrary from './TestLibrary/index';

/**
 * /run route entry point.
 *
 * Centralized to reuse the same implementation as TestLibrary so
 * UX updates land in one place and remain consistent across views.
 */
export default function TestRunner() {
  return <TestLibrary />;
}
