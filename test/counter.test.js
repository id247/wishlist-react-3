import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { INCREMENT, DECREMENT } from '../src/js/actions';
import { counter } from '../src/js/reducers/counter';

describe('counter', () => {

	it('should provide the initial state', () => {
		const stateBefore = undefined;
		const action = {};
		const stateAfter = 0;
		
		//deepFreeze(stateBefore);
		deepFreeze(stateAfter);

		expect(counter(stateBefore, action)).to.deep.equal(stateAfter);
	});

	it('should handle INCREMENT action', () => {
		const stateBefore = 1;
		const action = { type: INCREMENT };
		const stateAfter = 2;
		
		deepFreeze(stateBefore);
		deepFreeze(stateAfter);

		expect(counter(stateBefore, action)).to.deep.equal(stateAfter);
	});

	it('should handle DECREMENT action', () => {
		const stateBefore = 1;
		const action = { type: DECREMENT };
		const stateAfter = 0;
	
		deepFreeze(stateBefore);
		deepFreeze(stateAfter);

		expect(counter(stateBefore, action)).to.deep.equal(stateAfter);
	});

	it('should not handle DECREMENT action if state < 0', () => {
		const stateBefore = 0;
		const action = { type: DECREMENT };
		const stateAfter = 0;
		
		deepFreeze(stateBefore);
		deepFreeze(stateAfter);

		expect(counter(stateBefore, action)).to.deep.equal(stateAfter);
	});

	it('should ignore unknown actions', () => {
		const stateBefore = 1;
		const action = { type: 'unknown' };
		const stateAfter = 1;

		deepFreeze(stateBefore);
		deepFreeze(stateAfter);

		expect(counter(stateBefore, action)).to.deep.equal(stateAfter);
	});

	it('should set state to 0 if undefined state passed', () => {
		const stateBefore = undefined;
		const action = { type: 'unknown' };
		const stateAfter = 0;
				
		//deepFreeze(stateBefore);
		deepFreeze(stateAfter);

		expect(counter(stateBefore, action)).to.deep.equal(stateAfter);
	});

});

