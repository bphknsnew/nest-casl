import { defineAbility } from '@casl/ability';
import { ConditionsProxy } from './conditions.proxy';

describe('ConditionsProxy', () => {
  it('translates proxied conditions to parametrized sql', () => {
    const ability = defineAbility((can) => {
      can('update', 'Post', { userId: 'userId' });
    });
    const conditionsProxy = new ConditionsProxy(ability, 'update', 'Post');
    expect(conditionsProxy.toSql()).toEqual(['"userId" = $1', ['userId'], []]);
  });

  it('negates cannot rule with not', () => {
    const ability = defineAbility((can, cannot) => {
      can('update', 'Movie');
      cannot('update', 'Movie', { status: 'PUBLISHED' });
    });
    const conditionsProxy = new ConditionsProxy(ability, 'update', 'Movie');
    expect(conditionsProxy.toSql()).toEqual(['not ("status" = $1)', ['PUBLISHED'], []]);
  });

  it('compose can rules', () => {
    const ability = defineAbility((can) => {
      can('read', 'Upload', { public: true });
      can('read', 'Upload', { user: 'userId', public: false });
    });
    const conditionsProxy = new ConditionsProxy(ability, 'read', 'Upload');
    expect(conditionsProxy.toSql()).toEqual([
      '("user" = $1 and "public" = $2) or "public" = $3',
      ['userId', false, true],
      [],
    ]);
  });

  it('return undefined when no rules found', () => {
    const ability = defineAbility((can) => {
      can('read', 'Upload', { public: true });
    });
    const conditionsProxy = new ConditionsProxy(ability, 'write', 'Upload');
    expect(conditionsProxy.toSql()).toBeUndefined();
  });

  it('return undefined for rule without conditions', () => {
    const ability = defineAbility((can) => {
      can('read', 'Upload');
    });
    const conditionsProxy = new ConditionsProxy(ability, 'read', 'Upload');
    expect(conditionsProxy.toSql()).toBeUndefined();
  });
});
