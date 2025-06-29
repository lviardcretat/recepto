import mitt from 'mitt';

type ApplicationEvents = {
	'ustensil:created': boolean;
	'ingredient:created': boolean;
	'recipesCategory:created': boolean;
	'recipe:created': boolean;
};

const emitter = mitt<ApplicationEvents>();

export const useEvent = emitter.emit;
export const useListen = emitter.on;
