import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { REQUEST_POSTS, RECEIVE_POSTS } from '../src/js/actions';
import { posts } from '../src/js/reducers/posts';

describe('posts', () => {

	it('should provide the initial state', () => {
		const stateBefore = [];	
		const action = { type: REQUEST_POSTS };
		const stateAfter = [];
		
		deepFreeze(stateBefore);
		deepFreeze(stateAfter);

		expect(posts(stateBefore, action)).to.deep.equal(stateAfter);
	});

	it('should upade state with array', () => {
		const stateBefore = [];
		const action = {	type: RECEIVE_POSTS,
							subreddit: 'subreddit',
							posts: [{id: 1}, {id: 2}],
							receivedAt: Date.now()
						};
		const stateAfter = [{id: 1}, {id: 2}];

		deepFreeze(stateBefore);
		deepFreeze(stateAfter);

		expect(posts(stateBefore, action)).to.deep.equal(stateAfter);
	});

});

