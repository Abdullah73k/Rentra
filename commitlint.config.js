// commitlint.config.js (ESM) — case-insensitive parsing, allow Task/Bus mixed case
export default {
  parserPreset: {
    parserOpts: {
      // Add the 'i' flag for case-insensitive match
      headerPattern: /^([A-Z]+-\d+)\[([^\]]+)\]\[(task|bus)\]: (.+)$/i,
      headerCorrespondence: ['ticket', 'scope', 'type', 'subject'],
    },
  },
  rules: {
    // allow both lower and upper forms so the built-in enum check doesn't fail
    'type-enum': [2, 'always', ['task', 'Task', 'bus', 'Bus']],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 200],
  },
};
