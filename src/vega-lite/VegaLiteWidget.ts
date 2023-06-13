import { IChangedTiddlers } from 'tiddlywiki';
import vegaEmbed from 'vega-embed';
import { widget as Widget } from '$:/core/modules/widgets/widget.js';

class VegaLiteWidget extends Widget {
  refresh(changedTiddlers: IChangedTiddlers) {
    return false;
  }

  render(parent: Node, nextSibling: Node) {
    this.parentDomNode = parent;

    this.computeAttributes();
    this.execute();

    const containerElement = $tw.utils.domMaker('div', {
      text: 'vega-lite',
    });

    const id = 'vis' + Math.round(Math.random() * 100000).toString();
    containerElement.setAttribute('id', id);
    this.domNodes.push(parent.appendChild(containerElement));

    const tid = this.getAttribute('spec', '');

    const spec = JSON.parse(this.wiki.getTiddler(tid).fields.text);

    vegaEmbed(`#${id}`, spec);
  }
}

exports["vega-lite"] = VegaLiteWidget;
