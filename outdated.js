(function () {
    // 定义阈值（单位：天）
    const warningDays = 31;
    const errorDays = 365;
    const msPerDay = 86400000;

    // 获取页面中的 time 元素和文章内容
    const times = document.getElementsByTagName('time');
    if (!times.length) return;
    const posts = document.getElementsByClassName('post-body');
    if (!posts.length) return;

    // 获取文章发布时间与当前时间的时间戳差值
    const pubTime = new Date(times[0].dateTime);
    const diffMs = Date.now() - pubTime.getTime();
    const daysAgo = Math.floor(diffMs / msPerDay);

    // 根据提示类型生成 HTML
    const createNotice = (type) => `
    <div class="note ${type}">
      <h5>文章时效性提示</h5>
      <p>这是一篇发布于 ${daysAgo} 天前的文章，部分信息可能已发生改变，请注意甄别。</p>
    </div>`;

    // 判断发布时间，根据不同阈值添加对应样式的提示信息
    if (diffMs > warningDays * msPerDay && diffMs < errorDays * msPerDay) {
        posts[0].innerHTML = createNotice('warning') + posts[0].innerHTML;
    } else if (diffMs >= errorDays * msPerDay) {
        posts[0].innerHTML = createNotice('danger') + posts[0].innerHTML;
    }
}());