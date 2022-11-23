---
banner:
  name: '工具库'
  desc: '提高复用性, 更懂你的工具库'
  btns: 
    - { name: '开始', href: './documents/index.html', primary: true }
    - { name: 'Github', href: 'https://github.com/shuoshubao/nbfe/tree/master/packages/tools', primary: true }
  caption: '当前版本: v0.2.12'
features: 
  - { name: '零依赖', desc: '只依赖 lodash, 不搞一些基础的重复' }
  - { name: '懂业务', desc: '完全基于业务和组件库提炼, 没有花里胡哨的功能' }
  - { name: '优雅', desc: '每一个方法名都经过严格的思考, 让你用一次就记得住' }

footer:
  copyRight:
    name: '硕鼠宝'
    href: 'https://github.com/shuoshubao/'
  links:
    团队网址:
      - { name: 'NBFE', href: 'https://github.com/shuoshubao/nbfe/' }
    Git仓库:
      - { name: 'Github', href: 'https://github.com/shuoshubao/nbfe/tree/master/packages/tools' }

---

<Homepage banner={banner} features={features} />
<Footer distPath={props.page.distPath} copyRight={props.footer.copyRight} links={props.footer.links} />
