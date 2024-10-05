import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
	extends: ['@commitlint/config-conventional'],
	parserPreset: 'conventional-changelog-atom',
	formatter: '@commitlint/format',
	rules: {
		'type-enum': [
			RuleConfigSeverity.Error,
			'always',
			[
				'build',
				'chore',
				'ci',
				'docs',
				'feat',
				'fix',
				'improvement',
				'perf',
				'refactor',
				'revert',
				'style',
				'test',
			],
		],
	},
};

export default Configuration;

/*
feat 		A new feature
fix 		A bug fix
docs 		Documentation only changes
improvement Improve a current implementation without adding a new feature or fixing a bug
style 		Changes that do not affect the meaning of the code (white-space, formatting etc)
refactor 	A code change that neither fixes a bug nor adds a feature
perf 		A code change that improves performance
test 		Adding missing tests or correcting existing tests
build 		Changes that affect the build system or external dependencies
ci 			Changes to our CI configuration files and scripts
chore 		Other changes that don't modify src or test files
revert 		Reverts a previous commit
*/
