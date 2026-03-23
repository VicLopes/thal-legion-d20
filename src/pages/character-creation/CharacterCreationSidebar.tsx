import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"

const STEPS = [
    { key: 'basic', label: 'Basic Info' },
    { key: 'class', label: 'Class' },
    { key: 'stats', label: 'Stats' },
    { key: 'abilities', label: 'Abilities' },
]

interface CharacterCreationSidebarProps {
    step: number
}

export function CharacterCreationSidebar({ step }: CharacterCreationSidebarProps) {
    const navigate = useNavigate()

    return (
        <Sidebar collapsible="offcanvas">
            <SidebarContent>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={() => {void navigate('/')}}>
                                <span>Go back</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>Character Creation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {STEPS.map((s, i) => (
                                <SidebarMenuItem key={s.key}>
                                    <SidebarMenuButton isActive={i === step} disabled={i > step}>
                                        <span className="text-xs text-muted-foreground">{i + 1}.</span>
                                        <span>{s.label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}