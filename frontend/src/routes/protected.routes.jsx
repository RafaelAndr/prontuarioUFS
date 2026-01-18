import { ProtectedRoute } from "../components/auth/ProtectedRoute.jsx";
import InitialPage from "../pages/InitialPage/InitialPage.jsx";
import PatienteForm from "../components/PatienteForm/PatienteForm.jsx";
import PatientePage from "../pages/PatientePage/PatientePage.jsx";
import BaseAnamneseForm from "../components/BaseAnamneseForm/BaseAnamneseForm.jsx";
import ChildAnamneseForm from "../components/ChildAnamneseForm/ChildAnamneseForm.jsx";
import ReturnAnameseForm from "../components/ReturnAnamneseForm/ReturnAnameseForm.jsx";
import AnamnesesDetails from "../pages/AnamnesesDetails/AnamnesesDetails.jsx";
import FoodPlanForm from "../components/FoodPlanForm/FoodPlanForm.jsx";
import RecordatoryForm from "../components/RecordatoryForm/RecordatoryForm.jsx";
import ChildAnamneseDetails from "../pages/ChildAnamneseDetails/ChildAnamneseDetails.jsx";
import ReturnAnamneseDetails from "../pages/ReturnAnamneseDetails/ReturnAnamneseDetails.jsx";
import FoodPlanDetails from "../pages/FoodPlanDetails.jsx/FoodPlanDetails.jsx";
import RecordatoryDetails from "../pages/RecordatoryDetails.jsx/RecordatoryDetails.jsx";


import WorkspaceSelection from "../pages/WorkspaceSelection/WorkspaceSelection.jsx";
import WorkspaceSettings from "../pages/WorkspaceSettings/WorkspaceSettings.jsx";


export const protectedRoutes = [
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/workspace-selection",
                element: <WorkspaceSelection />,
            },
            {
                path: "/configuracoes-clinica",
                element: <WorkspaceSettings />,
            },
            {
                path: "/",
                element: <InitialPage />,
            },
            {
                path: "/cadastrar-paciente",
                element: <PatienteForm />,
            },
            {
                path: "/editar-paciente/:pacienteId",
                element: <PatienteForm />,
            },
            {
                path: "/pagina-paciente/:id",
                element: <PatientePage />,
            },

            // ANAMNESES
            {
                path: "/anamnese-padrao/:pacienteId",
                element: <BaseAnamneseForm />,
            },
            {
                path: "/anamnese-infantil/:pacienteId",
                element: <ChildAnamneseForm />,
            },
            {
                path: "/anamnese-retorno/:pacienteId",
                element: <ReturnAnameseForm />,
            },
            {
                path: "/anamnese-plano-alimentar/:pacienteId",
                element: <FoodPlanForm />,
            },
            {
                path: "/anamnese-ficha-recordatorio/:pacienteId",
                element: <RecordatoryForm />,
            },
            // DETALHES
            {
                path: "/detalhes-anamnese/:id",
                element: <AnamnesesDetails />,
            },
            {
                path: "/detalhes-child-anamnese/:id",
                element: <ChildAnamneseDetails />,
            },
            {
                path: "/detalhes-return-anamnese/:id",
                element: <ReturnAnamneseDetails />,
            },
            {
                path: "/detalhes-food-plan/:id",
                element: <FoodPlanDetails />,
            },
            {
                path: "/detalhes-recordatory/:id",
                element: <RecordatoryDetails />,
            },
            // EDITAR
            {
                path: "/base-anamnese/editar/:pacienteId/:anamneseId",
                element: <BaseAnamneseForm />,
            },
            {
                path: "/child-anamnese/editar/:pacienteId/:anamneseId",
                element: <ChildAnamneseForm />,
            },
            {
                path: "/anamnese-retorno/editar/:pacienteId/:anamneseId",
                element: <ReturnAnameseForm />,
            },
            {
                path: "/food-plan/editar/:pacienteId/:anamneseId",
                element: <FoodPlanForm />,
            },
            {
                path: "/recordatory/editar/:pacienteId/:anamneseId",
                element: <RecordatoryForm />,
            },
        ],
    },
];
