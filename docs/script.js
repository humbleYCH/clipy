// 仅切换本地截图；下载链接无需 JavaScript 即可使用。
const screenshots = {
  clipboard: { src: './assets/clipboard.png', alt: 'Clipy 剪贴板界面，集中展示图片和文字历史记录，支持预览、翻译和收藏', caption: '复制过的文字和图片，放在一起，随时查找。' },
  todos: { src: './assets/todos.png', alt: 'Clipy 待办界面，展示带有工作与生活标签的任务清单，可添加任务和子步骤', caption: '用标签和子步骤，把工作与生活的小事安排好。' },
  sketch: { src: './assets/sketch.png', alt: 'Clipy 画板界面，使用自由画笔、文字和图形整理想法', caption: '几笔勾勒一个想法，画布会自动保存。' },
}
const tabs = [...document.querySelectorAll('[data-screen]')]
const image = document.getElementById('product-screen')
const panel = document.getElementById('screen-panel')
const caption = document.getElementById('screen-caption')

function selectScreenshot(tab) {
  const screenshot = screenshots[tab.dataset.screen]
  if (!screenshot) return
  tabs.forEach((item) => {
    const selected = item === tab
    item.setAttribute('aria-selected', String(selected))
    item.tabIndex = selected ? 0 : -1
  })
  image.src = screenshot.src
  image.alt = screenshot.alt
  panel.setAttribute('aria-labelledby', tab.id)
  caption.textContent = screenshot.caption
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectScreenshot(tab))
  tab.addEventListener('keydown', (event) => {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else return
    event.preventDefault()
    selectScreenshot(tabs[next])
    tabs[next].focus()
  })
})
