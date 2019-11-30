import {DiagramModel} from "../models/diagram";
import {EntityModel} from "../models/entity";
import {getModel} from "../functions/get-model";
import {Field} from "../field";
import {widgetOptions} from "../widget-options";
import {toLowerCamelCase} from "../functions/to-lower-camel-case";

require('./edit.view.sass');

class EditView {
    private model: DiagramModel | EntityModel;
    private linkModel: DiagramModel | EntityModel;
    private ready: Promise<void>;

    private get form(): HTMLFormElement {
        return document.forms['edit'];
    }

    private get fields(): HTMLElement {
        return document.getElementById('fields');
    }

    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        this.ready = new Promise((resolve) => {
            miro.onReady(() => {
                getModel(id).then((model) => {
                    this.model = model;
                    resolve();
                });
            });
        });
    }

    public init(): Promise<void> {
        return this.ready
            .then(() => this.createForm())
            .then(() => {
                this.form.onsubmit = (event) => {
                    event.preventDefault();
                    this.save();
                };

                this.form.cancel.onclick = () => this.close();
            });
    }

    private getInput(name: string): HTMLInputElement {
        return this.form.elements[name];
    }

    private createLinks(): Promise<HTMLElement> {
        return this.model.getPossibleLinks().then((links) => {
            if (!links.length) {
                return null;
            }

            const linksElement = document.createElement('div');
            linksElement.classList.add('links');

            links.forEach((possibleLink) => {
                const linkElement = document.createElement('div');

                linkElement.classList.add('link');
                linkElement.innerText = possibleLink.name;
                linkElement.dataset.id = possibleLink.id;

                if (this.model.meta.link === possibleLink.id) {
                    linkElement.classList.add('selected');
                }

                linksElement.append(linkElement);
            });

            linksElement.onclick = (event) => this.onClickLink(event.target as HTMLElement);

            return linksElement;
        });
    }

    private createForm(): Promise<void> {
        return this.createLinks().then((linksElement) => {
            const nameField = new Field('name', 'Name');
            const descriptionField = new Field('description', 'Description', 'textarea');
            const linkField = new Field('link', null, 'hidden');
            const linksTitleElement = document.createElement('div');

            if (this.model instanceof DiagramModel) {
                nameField.input.value = this.model.name;

                this.fields.append(
                    nameField.label,
                    nameField.input,
                    linkField.input
                );
            }

            if (this.model instanceof EntityModel) {
                let [name, description] = this.model.parseInnerText();
                nameField.input.value = name;
                descriptionField.input.value = description;

                this.fields.append(
                    nameField.label,
                    nameField.input,
                    descriptionField.label,
                    descriptionField.input,
                    linkField.input
                );
            }

            linkField.input.value = this.model.meta.link;

            const getLinksTitle = () => 'Link to ' + widgetOptions[toLowerCamelCase(this.model.linkType)].text;

            if (linksElement) {
                linksTitleElement.innerText = getLinksTitle();
                linksTitleElement.classList.add('links-title');
                linkField.input.before(linksElement);
                linksElement.before(linksTitleElement);
            }
        });
    }

    private onClickLink(link: HTMLElement) {
        const selectedClass = 'selected';
        const alreadySelected: boolean = link.classList.contains(selectedClass);

        Array.from(document.querySelectorAll('.link')).forEach((linkElement) => {
            linkElement.classList.remove(selectedClass);
        });

        if (alreadySelected) {
            this.getInput('link').value = '';
        } else {
            this.getInput('link').value = link.dataset.id;
            link.classList.add(selectedClass);
        }

        getModel(link.dataset.id).then((linkModel) => {
            if (!alreadySelected) {
                this.getInput('name').value = linkModel.name;
            }

            this.linkModel = linkModel;
        });
    }

    private save() {
        const link = this.getInput('link').value;
        this.model.meta.link = link ? link : null;

        let linkModelSave: Promise<void>;
        if (this.linkModel) {
            this.linkModel.meta.link = link ? this.model.widget.id : null;
            linkModelSave = this.linkModel.save();
        } else {
            linkModelSave = Promise.resolve();
        }

        if (this.model instanceof EntityModel) {
            const name = this.getInput('name').value;
            const description = this.getInput('description').value;

            this.model.setInnerText(name, description);
        }

        if (this.model instanceof DiagramModel) {
            this.model.name = this.getInput('name').value;
        }

        Promise.all([linkModelSave, this.model.save()]).then(() => this.close());
    }

    private close() {
        miro.board.ui.closeModal();
    }
}

const view = new EditView();
view.init();