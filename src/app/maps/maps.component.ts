import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotRow, CustomForm, Flow, Skin } from 'app/Interface/interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    @Input() SelectedFlow!: Flow;
    @Input() entityName!: string;

    bots: BotRow[] = [];
    forms: CustomForm[] = [];
    flows: Flow[] = [];
    skins: Skin;

    filteredForms: CustomForm[] = [];
    filteredBots: BotRow[] = [];
    filteredFlows: Flow[] = [];

    activeTab: 'bots' | 'forms' = 'bots';

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        if (typeof this.SelectedFlow === 'string') {
            console.error('Invalid SelectedFlow input. Expected object, got string.');
            return;
        }
        if (!this.SelectedFlow.steps) {
            this.SelectedFlow.steps = [];
        }
        this.loadFromLocalStorage();

        this.route.paramMap.subscribe(params => {
            this.entityName = params.get('botName');
        });

        this.filteredForms = this.forms.filter(
            form => form.entityName === 'global' || form.entityName === this.entityName
        );

        this.filteredBots = this.bots.filter(
            bot => bot.entityName === this.entityName
        );

        this.filteredFlows = this.flows.filter(
            flow => flow.entityName === 'global' || flow.entityName === this.entityName
        );
    }

    loadFromLocalStorage(): void {
        const botsData = localStorage.getItem('bots');
        const formsData = localStorage.getItem('forms');
        const flowsData = localStorage.getItem('flows');
        const skinsData = localStorage.getItem('skins');

        this.bots = botsData ? JSON.parse(botsData) : [];
        this.forms = formsData ? JSON.parse(formsData) : [];
        this.flows = flowsData ? JSON.parse(flowsData) : [];
        this.skins = skinsData ? JSON.parse(skinsData) : [];
    }

    // ✅ Add step to the editing flow
    addStep(step: { type: 'bot' | 'form' | 'agent'; name: string }) {
        if (this.SelectedFlow?.steps) {
            this.SelectedFlow.steps.push(step);
        }
    }

    // ✅ Shortcut methods for clarity (optional)
    addBot(bot: BotRow) {
        this.addStep({ type: 'bot', name: bot.botName });
    }

    addForm(form: CustomForm) {
        this.addStep({ type: 'form', name: form.formName });
    }

    // ✅ Reorder steps inside the Editing Flow
    onDrop(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(this.SelectedFlow.steps, event.previousIndex, event.currentIndex);
        }
    }

    // ✅ Remove step by index
    removeStep(index: number) {
        this.SelectedFlow.steps.splice(index, 1);
    }
    saveOrUpdateFlow() {
        const flowsData = localStorage.getItem('flows');
        let flows: Flow[] = flowsData ? JSON.parse(flowsData) : [];

        const existingIndex = flows.findIndex(f => f.flowName === this.SelectedFlow.flowName);

        if (existingIndex !== -1) {
            // 🟡 Update existing
            flows[existingIndex] = this.SelectedFlow;
        } else {
            // 🟢 Save new
            flows.push(this.SelectedFlow);
        }

        localStorage.setItem('flows', JSON.stringify(flows));
        alert('✅ Flow saved/updated successfully!');
    }

}
