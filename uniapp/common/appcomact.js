

export function getItem(key){
		// #ifdef APP-PLUS
		return plus.storage.getItem(key);
		// #endif
		// #ifdef APP-PLUS
		return uni.getStorageSync(key);
		// #endif
		
	};
export function setItem(key,value){
		// #ifdef APP-PLUS
		return plus.storage.setItem(key,value);
		// #endif
		// #ifdef APP-PLUS
		return uni.setStorageSync(key,value);
		// #endif
	};
	
export function	removeItem(key){
		// #ifdef APP-PLUS
		return plus.storage.removeItem(key)
		// #endif
		// #ifdef APP-PLUS
		return uni.removeStorageSync(key);
		// #endif
	};
	
export function setFullscreen(type){
	// #ifdef APP-PLUS
		plus.navigator.setFullscreen(type);
	// #endif
	// #ifndef APP-PLUS
		return false;
	// #endif
}