## INFO ##
## INFO ##

REPLACE = {
    '#': '\u2500', # horizontal
    '$': '\u252C', # Y, down
    '^': '\u2534', # Y, up
    '&': ' '*30,
}

def replacer(string):
    for rule in REPLACE.items():
        string = string.replace(*rule)
    return string

print(replacer('\n'.join((
'#############################################################$##################',
'                               &\u2502 \u250F\u2501\u2501\u2501\u2501\u2501\u2513',
' Come In, We Are Open!         &\u2502 \u2503     \u2503 Kitchen',
' Next Hackathon: 24-25th July  &\u2502 \u2503     \u2503 Budapest',
'                               &\u2502 \u2517\u2501\u2501\u2501\u2501\u2501\u251B',
'#############################################################^##################',
'news',
'{',
'    next_hackathon: [24, 25, "July"];',
'}',
'',
'links',
'{',
'    github: "https://github.com/kitchenbudapest"',
'}',
))))
