quantity='1'
width='M'
color='feed_00000000209451'
size='1000013'
sku='58000000003466800010000M006.5'

first='Jess'
last='V'
street='1700 Alabama St.'
city='San Francisco'
state='CA'
zip='94100'
email='fake@gmail.com'
phone='0000000000'

acct='1234123412341'
secure='123'


.PHONY: default
default:
	@echo "Shoe info: quantity=$(quantity), width='M', color='black', size='13'"
	@echo "Buyer info: first=$(first), last=$(last), street=$(street), city=$(city),  state=$(state), zip=$(zip), email=$(email), phone=$(phone)"
	@echo "Card info: acct=$(acct), secure-$(secure)"

	phantomjs library.js $(quantity) $(width) $(color) $(size) $(sku) $(first) $(last) $(street) $(city) $(state) $(zip) $(email) $(phone) $(acct) $(secure)

