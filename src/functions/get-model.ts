import {getWidget} from "./get-widget";
import IShapeWidget = SDK.IShapeWidget;
import {config} from "../config";
import {DiagramModel} from "../models/diagram";
import {EntityModel} from "../models/entity";

export const getModel = (id: string): Promise<DiagramModel|EntityModel> => getWidget(id).then((widget) => {
    if (!widget) {
        return null;
    }

    const meta = widget.metadata[config.appId];

    if (meta.type.indexOf('-diagram') !== -1) {
        return new DiagramModel(widget as IShapeWidget);
    } else {
        return new EntityModel(widget as IShapeWidget);
    }
});