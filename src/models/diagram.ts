import {Model} from "./model";
import IShapeWidget = SDK.IShapeWidget;
import {EntityModel} from "./entity";

export class DiagramModel extends Model {
    public get name(): string {
        return this.widget.plainText.replace(this.defaultText, '').trim();
    }

    public set name(value: string) {
        this.widget.text = '<p>' + value + '</p><p>' + this.defaultText + '</p>';
    }

    public get linkType(): string {
        return this.type.replace('-diagram', '');
    }

    public constructor(widget: IShapeWidget) {
        super(widget);
    }

    protected createLinkModel(widget: IShapeWidget): any {
        return new EntityModel(widget);
    }
}