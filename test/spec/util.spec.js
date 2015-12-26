import $ from '../../src/util'

describe('unit', () => {

	describe('css', () => {
		
		describe('hasClass()', () => {
			let elem = document.createElement('div')
			let $elem = $(elem)
			elem.className = 'aa'
			it('should return true when there is given class name', () => {
				expect($elem.hasClass('aa')).to.equal(true)
			})
			it('should return false when there is no given class name', () => {
				expect($elem.hasClass('bb')).to.equal(false)
			})
			it('should return false when give ""', () => {
				expect($elem.hasClass('')).to.equal(false)
			})
			it('should return false when give nothing', () => {
				expect($elem.hasClass()).to.equal(false)
			})
		})
		
		describe('addClass()', () => {
			let elem = document.createElement('div')
			let $elem = $(elem)
			elem.className = ''
			it('should correctly add the given class name', () => {
				$elem.addClass('aa')
				expect(elem.className).to.equal('aa')
			})
			it('should not add the class name that already have', () => {
				$elem.addClass('aa')
				expect(elem.className).to.equal('aa')
			})
		})
		
		describe('removeClass()', () => {
			let elem = document.createElement('div')
			let $elem = $(elem)
			elem.className = 'aa bb cc'
			it('should correctly remove the given class name', () => {
				$.removeClass(elem, 'bb')
				expect(elem.className).to.equal('aa cc')
				$.removeClass(elem, 'cc')
				expect(elem.className).to.equal('aa')
			})
			it('should not remove anything when give ""', () => {
				$.removeClass(elem, '')
				expect(elem.className).to.equal('aa')
			})
			it('should not remove anything when give nothing', () => {
				$.removeClass(elem)
				expect(elem.className).to.equal('aa')
			})
		})
		
		describe('css()', () => {
			let elem = document.createElement('div')
			let $elem = $(elem)
			it('should correctly set the css property value', () => {
				$elem.css({ position: 'absolute' })
				expect(elem.style.position).to.equal('absolute')
				$elem.css('color', 'black')
				expect(elem.style.color).to.equal('black')
			})
			it('should return correct css property value', () => {
				expect($elem.css('color')).to.equal('black')
			})
		})

		describe('getSupportedCSS()', () => {
			it('should support autoPrefix', () => {
				expect($.getSupportedCSS('transform')).to.equal('-webkit-transform')
			})
			it('should return undefined when not support the given property', () => {
				expect($.getSupportedCSS('s')).to.equal(undefined)
			})
		})

	})
	
	describe('array', () => {
		
		describe('forEach()', () => {
			it('should correctly traverse the array', () => {
				let i = 0
				$.forEach([1, 2, 3], (val) => i += val)
				expect(i).to.equal(6)
			})
		})

		describe('keys()', () => {
			it('should correctly get the keys', () => {
				let res = $.keys([1, 2, 3])
				expect(res).to.deep.equal(['0', '1', '2'])
			})
		})

	})


})