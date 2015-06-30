## INFO ##
## INFO ##

# Import python modules
from itertools   import repeat
from string      import printable
from collections import OrderedDict

class Tag:
    format_o = '<{0.n}>'
    format_c = '</{0.n}>'
    n = 'html'

    @property
    def o(self):
        return self.format_o.format(self)

    @property
    def c(self):
        return self.format_c.format(self)

class Null(Tag):
    format_o = ''
    format_c = ''

class Span(Tag):
    format_o = '<{0.n} class="lang-{0.v}">'
    format_c = '</{0.n}>'
    n = 'span'

    def __init__(self, variable):
        self.v = variable

TAGS = (Span('comment'),    # 0
        Span('entity'),     # 1
        Span('class'),      # 2
        Span('member'),     # 3
        Span('operator'),   # 4
        Span('string'),     # 5
        Span('const'),      # 6
        Span('decorator'))  # 7

HEADER = ('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">'
          '<title>Come in, We are OPEN!</title>'
          '<link rel="stylesheet" href="css/reset.css">'
          '<link rel="stylesheet" href="css/style.css">'
          '<script src="script.js"></script>'
          '</head><body><div id="main"><pre><code>')
FOOTER = '</code></pre></div></body></html>'

PAGE_UNICODE = """\
                                                           {7.o}╲   ╲{7.c}
                                                            {7.o}╲ F ╲{7.c}
                                                             {7.o}╲ O ╲{7.c}
                                                              {7.o}╲ R ╲{7.c}
                                                               {7.o}╲ K ╲{7.c}
{0.o}─────────────────────────────────────────────┬──────────────────{0.c}{7.o}╲   ╲{7.c}{0.o}───────────{0.c}
                                             {0.o}│{0.c} {1.o}┏━━━━━┓{1.c}           {7.o}╲ U ╲{7.c}
 Come In, We Are Open!                       {0.o}│{0.c} {1.o}┃{1.c}     {1.o}┃{1.c} Kitchen    {7.o}╲ S ╲{7.c}
 Next Hackathon: 24-25th July                {0.o}│{0.c} {1.o}┃{1.c}     {1.o}┃{1.c} Budapest    {7.o}╲   ╲{7.c}
                                             {0.o}│{0.c} {1.o}┗━━━━━┛{1.c}              {7.o}╲ O ╲{7.c}
{0.o}─────────────────────────────────────────────┴───────────────────────{0.c}{7.o}╲ N ╲{7.c}{0.o}──────{0.c}
                                                                      {7.o}╲   ╲{7.c}
{2.o}news{2.c}                                                                   {7.o}╲ G ╲{7.c}
{{                                                                       {7.o}╲ I ╲{7.c}
    {3.o}.next_hackathon{3.c} {4.o}={4.c} {{{6.o}7{6.c}, {6.o}8{6.c}, {5.o}"August"{5.c}}};                                  {7.o}╲ T ╲{7.c}
}}                                                                         {7.o}╲ H ╲{7.c}
                                                                           {7.o}╲ U ╲{7.c}
{2.o}links{2.c}                                                                       {7.o}╲ B {7.c}
{{                                                                            {7.o}╲  {7.c}
    {3.o}.github{3.c}    {4.o}={4.c} {5.o}"https://github.com/kitchenbudapest"{5.c};                        {7.o}╲ {7.c}
    {3.o}.more_info{3.c} {4.o}={4.c} {5.o}"http://www.kibu.hu"{5.c};                                         {7.o}╲{7.c}
}}

{0.o}────────────────────────────────────────────────────────────────────────────────{0.c}\
"""

PAGE_ASCII = """\
{0.o}+--------------------------------------------------------{7.o}-----{7.c}-----------------+
|{0.c}                                                         {7.o}\   \{7.c}                {0.o}|
|{0.c}                                                          {7.o}\ F \{7.c}               {0.o}|
|{0.c}                                                           {7.o}\ O \{7.c}              {0.o}|
|{0.c}                                                            {7.o}\ R \{7.c}             {0.o}|
|{0.c}                                                             {7.o}\ K \{7.c}            {0.o}|
+--------------------------------------------+-----------------{0.c}{7.o}\   \{7.c}{0.o}-----------+
|{0.c}                                            {0.o}|{0.c} {1.o}#######{1.c}          {7.o}\ U \{7.c}          {0.o}|
|{0.c} Come In,                                   {0.o}|{0.c} {1.o}#{1.c}     {1.o}#{1.c} Kitchen   {7.o}\ S \{7.c}         {0.o}|
|{0.c} We Are Open!                               {0.o}|{0.c} {1.o}#{1.c}     {1.o}#{1.c} Budapest   {7.o}\   \{7.c}        {0.o}|
|{0.c}                                            {0.o}|{0.c} {1.o}#{1.c}     {1.o}#{1.c} Pow(T)      {7.o}\ O \{7.c}       {0.o}|
|{0.c}                                            {0.o}|{0.c} {1.o}#######{1.c}              {7.o}\ N \{7.c}      {0.o}|
+--------------------------------------------+-----------------------{0.c}{7.o}\   \{7.c}{0.o}-----+
|{0.c}                                                                     {7.o}\ G \{7.c}    {0.o}|
|{0.c} {2.o}news{2.c}                                                                 {7.o}\ I \{7.c}   {0.o}|
|{0.c} {{                                                                     {7.o}\ T \{7.c}  {0.o}|
|{0.c}     {3.o}.next_hackathon{3.c} {4.o}={4.c} {{{6.o}7{6.c}, {6.o}8{6.c}, {5.o}"August"{5.c}}};                                {7.o}\ H \{7.c} {0.o}|
|{0.c} }}                                                                       {7.o}\ U \{7.c}{0.o}|
|{0.c}                                                                          {7.o}\ B |{7.c}
{0.o}|{0.c} {2.o}links{2.c}                                                                     {7.o}\  |{7.c}
{0.o}|{0.c} {{                                                                          {7.o}\ |{7.c}
{0.o}|{0.c}     {3.o}.github{3.c}    {4.o}={4.c} {5.o}"https://github.com/kitchenbudapest"{5.c};                      {7.o}\|{7.c}
{0.o}|{0.c}     {3.o}.more_info{3.c} {4.o}={4.c} {5.o}"http://www.kibu.hu"{5.c};                                       {0.o}|
|{0.c} }}                                                                            {0.o}|
|                                                                              |
+------------------------------------------------------------------------------+
|                                                                              |
|                         {0.o}(c) 2015 Kitchen Budapest{0.c}                            |
|                                                                              |
+------------------------------------------------------------------------------+{0.c}\
"""

PAGE = PAGE_ASCII
print(PAGE.format(*(Null(),)*len(TAGS)))

def to_html(string):
    buffer = []
    for char in string:
        if char == ' ':
            buffer.append('&nbsp;')
        elif char == '\n':
            buffer.append('</br>')
        # If ASCII character
        elif char in printable:
            buffer.append(char)
        # If special character
        else:
            # http://www.amp-what.com
            buffer.append('&#{};'.format(ord(char)))
    return buffer

# Create HTML file and write out document
with open('index.html', mode='w') as file:
    print(HEADER, ''.join(to_html(PAGE)).format(*TAGS), FOOTER, sep='', file=file)
