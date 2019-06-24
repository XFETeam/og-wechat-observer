const DISPATCH_SHARE_EVENT_NAME = 'meta-info:onShareDataChange';

const getTitleNode = (() => {
  const node = document.querySelector('meta[property="og:wx-share-title"]') || document.querySelector('title');
  node.$$update = (nextValue) => {
    if (typeof nextValue !== 'string') {
      throw new Error(`更新值必须为 string 类型, nextValue = ${nextValue}`);
    }
    if (node.innerText !== undefined) {
      node.innerText = nextValue;
    } else if (node.content !== undefined) {
      node.content = nextValue;
    }
  };
  return shouldGetValue => (shouldGetValue ? (node.innerText || node.content) : node);
})();

const getDescriptionMetaNode = (() => {
  const node = document.querySelector('meta[property="og:wx-share-description"]')
    || document.querySelector('meta[name=description]');
  node.$$update = (nextValue) => {
    if (typeof nextValue !== 'string') {
      throw new Error(`更新值必须为 string 类型, nextValue = ${nextValue}`);
    }
    node.content = nextValue;
  };
  return shouldGetValue => (shouldGetValue ? node.content : node);
})();

const getShareUrlMetaNode = (() => {
  const node = document.querySelector('meta[property="og:wx-share-url"]');
  node.$$update = (nextValue) => {
    if (typeof nextValue !== 'string') {
      throw new Error(`更新值必须为 string 类型, nextValue = ${nextValue}`);
    }
    node.content = nextValue;
  };
  return shouldGetValue => (shouldGetValue ? node.content : node);
})();

const getShareImageMetaNode = (() => {
  const node = document.querySelector('meta[property="og:wx-share-img"]');
  node.$$update = (nextValue) => {
    if (typeof nextValue !== 'string') {
      throw new Error(`更新值必须为 string 类型, nextValue = ${nextValue}`);
    }
    node.content = nextValue;
  };
  return shouldGetValue => (shouldGetValue ? node.content : node);
})();

const config = { attributes: true, childList: true, subtree: true };

let observer;

const callback = (function callback() {
  let title = getTitleNode(true);
  let description = getDescriptionMetaNode(true);
  let shareUrl = getShareUrlMetaNode(true);
  const shareImage = getShareImageMetaNode(true);
  return () => {
    const currentTitle = getTitleNode(true);
    const currentDescription = getDescriptionMetaNode(true);
    const currentShareUrl = getShareUrlMetaNode(true);
    const currentShareImage = getShareImageMetaNode(true);
    if (currentTitle !== title
      || currentDescription !== description
      || currentShareUrl !== shareUrl
      || currentShareImage !== shareImage
    ) {
      title = currentTitle;
      description = currentDescription;
      shareUrl = currentShareUrl;
      window.dispatchEvent(new CustomEvent(DISPATCH_SHARE_EVENT_NAME, {
        detail: {
          title: currentTitle,
          description: currentDescription,
        },
      }));
    }
  };
}());

export default {
  init() {
    [
      getTitleNode(),
      getDescriptionMetaNode(),
      getShareUrlMetaNode(),
      getShareImageMetaNode(),
    ].forEach((node) => {
      observer = new MutationObserver(callback).observe(node, config);
    });
  },
  update({ title, description }) {
    if (title) {
      getTitleNode().$$update(title);
    }
    if (description) {
      getDescriptionMetaNode().$$update(description);
    }
  },
  destroyObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  },
};
