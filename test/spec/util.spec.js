import $ from '../../src/util'

describe('unit', () => {

	describe('css', () => {

		describe('hasClass()', () => {
			let elem = document.createElement('div')
			let $elem = $(elem)
			elem.className = 'aa'
			it('should return true when there is given class name', () => {
				expect($elem.hasClass('aa')).toEqual(true)
			})
			it('should return false when there is no given class name', () => {
				expect($elem.hasClass('bb')).toEqual(false)
			})
			it('should return false when give ""', () => {
				expect($elem.hasClass('')).toEqual(false)
			})
			it('should return false when give nothing', () => {
				expect($elem.hasClass()).toEqual(false)
			})
		})

		describe('addClass()', () => {
			let elem = document.createElement('div')
			let $elem = $(elem)
			elem.className = ''
			it('should correctly add the given class name', () => {
				$elem.addClass('aa')
				expect(elem.className).toEqual('aa')
			})
			it('should not add the class name that already have', () => {
				$elem.addClass('aa')
				expect(elem.className).toEqual('aa')
			})
		})

		describe('removeClass()', () => {
			let elem = document.createElement('div')
			let $elem = $(elem)
			elem.className = 'aa bb cc'
			it('should correctly remove the given class name', () => {
				$.removeClass(elem, 'bb')
				expect(elem.className).toEqual('aa cc')
				$.removeClass(elem, 'cc')
				expect(elem.className).toEqual('aa')
			})
			it('should not remove anything when give ""', () => {
				$.removeClass(elem, '')
				expect(elem.className).toEqual('aa')
			})
			it('should not remove anything when give nothing', () => {
				$.removeClass(elem)
				expect(elem.className).toEqual('aa')
			})
		})

		describe('css()', () => {
			let elem = document.createElement('div')
			let $elem = $(elem)
			it('should correctly set the css property value', () => {
				$elem.css({ position: 'absolute' })
				expect(elem.style.position).toEqual('absolute')
				$elem.css('color', 'black')
				expect(elem.style.color).toEqual('black')
			})
			it('should return correct css property value', () => {
				expect($elem.css('color')).toEqual('black')
			})
		})

		describe('getSupportedCSS()', () => {
			it('should support autoPrefix', () => {
				expect($.getSupportedCSS('transform')).toEqual('-webkit-transform')
			})
			it('should return undefined when not support the given property', () => {
				expect($.getSupportedCSS('s')).toEqual(undefined)
			})
		})

	})

	describe('array', () => {

		describe('forEach()', () => {
			it('should correctly traverse the array', () => {
				let i = 0
				$.forEach([1, 2, 3], (val) => i += val)
				expect(i).toEqual(6)
			})
		})

		describe('keys()', () => {
			it('should correctly get the keys', () => {
				let res = $.keys([1, 2, 3])
				expect(res).toEqual(['0', '1', '2'])
			})
		})

	})


})
